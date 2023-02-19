"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
var ethers_1 = require("ethers");
var providers_1 = require("@ethersproject/providers");
var address_1 = require("@ethersproject/address");
var Connection = /** @class */ (function () {
    function Connection(_config) {
        this._config = _config;
        var provider = _config.provider, signer = _config.signer;
        // Sanitize Provider & Signer
        this.setProvider(provider, signer);
    }
    Connection.fromNetwork = function (networkish) {
        if (typeof networkish === "string") {
            networkish = networkish.toLowerCase();
        }
        var provider = ethers_1.ethers.providers.getDefaultProvider(ethers_1.ethers.providers.getNetwork(networkish), {
            infura: "1xraqrFyjLg2yrVtsN543WdKqJC",
        });
        return new Connection({
            provider: provider,
        });
    };
    Connection.fromNode = function (node) {
        return new Connection({
            provider: node,
        });
    };
    Connection.prototype.setProvider = function (provider, signer) {
        this._config.provider = provider;
        if (typeof provider === "string") {
            this._client = ethers_1.ethers.providers.getDefaultProvider(provider, {
                infura: "1xraqrFyjLg2yrVtsN543WdKqJC",
            });
        }
        else {
            if (provider.anyNetwork !== undefined) {
                this._client = provider;
            }
            else {
                this._client = new providers_1.Web3Provider(provider);
            }
        }
        this.setSigner(signer !== null && signer !== void 0 ? signer : 0);
    };
    Connection.prototype.getProvider = function () {
        return this._client;
    };
    Connection.prototype.setSigner = function (signer) {
        if (typeof signer === "string") {
            this._config.signer = address_1.getAddress(signer);
        }
        else if (ethers_1.Signer.isSigner(signer)) {
            this._config.signer = signer;
            // This should never happen
            if (!this._client) {
                throw Error("Please call \"setProvider(...)\" before calling setSigner(...)");
            }
            this._config.signer = signer.connect(this._client);
        }
        else {
            this._config.signer = signer;
        }
    };
    Connection.prototype.getSigner = function () {
        var signer = this._config.signer;
        if (signer === undefined) {
            throw Error("Signer is undefined, this should never happen.");
        }
        if (typeof signer === "string" || typeof signer === "number") {
            if (!this._client.getSigner) {
                throw Error("Connection.getSigner: Ethereum provider does not have a signer, " +
                    "probably because it's an external RPC connection.\n" +
                    ("Network: " + JSON.stringify(this._client._network, null, 2)));
            }
            return this._client.getSigner(signer);
        }
        else if (ethers_1.Signer.isSigner(signer)) {
            return signer;
        }
        else {
            throw Error("Signer is an unrecognized type, this should never happen. \n" + signer);
        }
    };
    Connection.prototype.getContract = function (address, abi, signer) {
        if (signer === void 0) { signer = true; }
        if (signer) {
            return new ethers_1.ethers.Contract(address, abi, this.getSigner());
        }
        else {
            return new ethers_1.ethers.Contract(address, abi, this._client);
        }
    };
    return Connection;
}());
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map