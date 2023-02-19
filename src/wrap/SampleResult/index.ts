import {
  Read,
  Write,
  Box,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeSampleResult,
  deserializeSampleResult,
  writeSampleResult,
  readSampleResult
} from "./serialization";
import * as Types from "..";

export class SampleResult {
  result: string;

  static toBuffer(type: SampleResult): ArrayBuffer {
    return serializeSampleResult(type);
  }

  static fromBuffer(buffer: ArrayBuffer): SampleResult {
    return deserializeSampleResult(buffer);
  }

  static write(writer: Write, type: SampleResult): void {
    writeSampleResult(writer, type);
  }

  static read(reader: Read): SampleResult {
    return readSampleResult(reader);
  }
}
