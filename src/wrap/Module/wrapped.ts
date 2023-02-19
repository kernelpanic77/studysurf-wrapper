import { wrap_load_env } from "@polywrap/wasm-as";
import {
  sampleMethod
} from "../../index";
import {
  deserializesampleMethodArgs,
  serializesampleMethodResult
} from "./serialization";
import * as Types from "..";

export function sampleMethodWrapped(argsBuf: ArrayBuffer, env_size: u32): ArrayBuffer {
  const args = deserializesampleMethodArgs(argsBuf);

  const result = sampleMethod(
    {
      arg: args.arg
    }
  );
  return serializesampleMethodResult(result);
}
