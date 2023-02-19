// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error StudySurf__InsufficientBalane();
error StudySurf__TransferFailed();
error StudySurf__NoActivePlan();
error StudySurf__NotEnoughEthSent();
error StudySurf__AlreadySubscribed();
error StudySurf__IncorrectIdProvided();

/**
 * @title StudySurf premium contract
 * @notice This contracts is use to keep track of the premium subscriptions for the StudySurf app.
 *         The contracts an ERC-1155 token to the subricber which represents the specific subscription plan.
 */

contract StudySurfPremium is ERC1155, Ownable {
    struct plan {
        string name;
        string uri;
        uint256 subscribers;
        uint256 price;
        uint time;
    }

    struct subscriber {
        uint256 plan;
        uint256 date;
    }

    /// a mapping of plan Id to the plan struct
    mapping(uint256 => plan) internal plans;

    /// a mapping of address to the subscription type and data
    mapping(address => subscriber) internal subscribers;

    uint256 public totalPlans;

    /// ================ EVENTS =================================
    event PlanAdded(
        string name,
        uint256 planId,
        string planUri,
        uint256 validity
    );

    event Subscribed(address suscriber, uint256 planId, uint256 expiry);

    /// ======================================================

    constructor(
        string memory name,
        string memory symbol,
        string memory uri
    ) ERC1155(uri) {}

    modifier correctId(uint id) {
        if (id > totalPlans || id < 0) {
            revert StudySurf__IncorrectIdProvided();
        }
        _;
    }

    /**
     * @notice this function checks the subscription plan status.
     * It takes in the address of the subscriber and the ID (type) of the plan
     * */
    function ifExpired(
        address subscriberAddress,
        uint id
    ) public view returns (bool) {
        if (subscribers[subscriberAddress].plan == id) {
            if (
                (block.timestamp) - (subscribers[subscriberAddress].date) <
                plans[id].time
            ) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    /**
     * @notice function to add a new type of subscription plan for the app
     * @param _name name of the plan
     * @param uri uri of the metadata associated with the plan type
     * @param price premium to be paid for the plan
     * @param time the validity of the plan in seconds.
     */
    function addPlan(
        string memory _name,
        string memory uri,
        uint256 price,
        uint time
    ) external onlyOwner {
        totalPlans += 1;

        uint256 id = totalPlans;
        plans[id] = plan(_name, uri, 0, price, time);

        emit PlanAdded(_name, id, uri, time);
    }

    /**
 * @notice Function to update the details of an existing subscription plan
 
 */
    function updatePlan(
        uint id,
        string memory _name,
        string memory uri,
        uint256 price,
        uint time
    ) external onlyOwner {
        plans[id] = plan(_name, uri, plans[id].subscribers, price, time);
    }

    /**
     *
     * @param planId Id of the type of the particular plan that is kept track my "plans" state variable
     */
    function subscribe(uint256 planId) external payable correctId(planId) {
        if (ifExpired(msg.sender, planId) != true) {
            revert StudySurf__AlreadySubscribed();
        }
        if (msg.value < plans[planId].price) {
            revert StudySurf__NotEnoughEthSent();
        }
        plans[planId].subscribers += 1;
        subscribers[msg.sender] = subscriber(planId, block.timestamp);
        _burn(
            msg.sender,
            subscribers[msg.sender].plan,
            balanceOf(msg.sender, subscribers[msg.sender].plan)
        );

        plans[subscribers[msg.sender].plan].subscribers =
            (plans[subscribers[msg.sender].plan].subscribers) -
            (balanceOf(msg.sender, subscribers[msg.sender].plan));

        _mint(msg.sender, planId, 1, "");

        emit Subscribed(
            msg.sender,
            planId,
            block.timestamp + plans[planId].time
        );

        // payable(msg.sender).transfer(msg.value);
    }

    /**
     * @notice returns the current plan a user is subscribed to
     * @param user address of the user/subscriber
     */

    function currentPlan(address user) public view returns (uint) {
        if (
            (block.timestamp) - (subscribers[msg.sender].date) <
            plans[subscribers[msg.sender].plan].time
        ) {
            revert StudySurf__NoActivePlan();
        }
        return subscribers[user].plan;
    }

    /**
     * @notice function that return the token URI of the specific type of subscription plan
     */
    function tokenURI(
        uint id
    ) public view correctId(id) returns (string memory) {
        return plans[id].uri;
    }

    /**
     *
     * @notice Returns the total number of subscriber active for a specific type of subscription plan
     */
    function tokenSupply(uint id) public view correctId(id) returns (uint) {
        return plans[id].subscribers;
    }

    /**
     *
     * @notice returns the subscription premium to be paid for a specific type of plan
     */
    function tokenPrice(uint id) public view correctId(id) returns (uint) {
        return plans[id].price;
    }

    /**
     * @notice returns the total number of subscription plans
     */
    function totalSupply() public view returns (uint) {
        return totalPlans;
    }

    function balance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function withdraw(uint256 amount) external onlyOwner {
        if (amount > address(this).balance) {
            revert StudySurf__InsufficientBalane();
        }
        (bool success, ) = payable(owner()).call{value: amount}("");
        if (!success) {
            revert StudySurf__TransferFailed();
        }
    }
}
