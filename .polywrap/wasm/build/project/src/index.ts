import { Args_sampleMethod, SampleResult } from "./wrap";

export function sampleMethod(args: Args_sampleMethod): SampleResult {
  return {
    result: args.arg,
  };
}
