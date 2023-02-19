import {
  Ethereum_Module,
  Args_deployContract,
  Args_setData,
  Args_getData,
} from "./wrap";
import {abi, bytecode} from "./contracts/StudySurfPremium";

export function sampleMethod(args: Args_sampleMethod): SampleResult {
  return {
    result: args.arg,
  };
}

export function addPlan(args: Args_getData) u32{
  const res = Ethereum_Module.callContractView({
    address: args.address,
    args: null,
    connection: args.connection,
  }).unwrap();

  return U32.parseInt(res);
}

export function subscribe(args: Args_setData): u32{
  const res = Ethereum_Module.callContractView({
    address: args.address,
    args: null,
    connection: args.connection,
  }).unwrap();

  return U32.parseInt(res);
}

export function deployContract(args: Args_deployContract): string {
  return Ethereum_Module.deployContract({
    abi,
    bytecode,
    args: null,
    connection: args.connection,
  }).unwrap();
}