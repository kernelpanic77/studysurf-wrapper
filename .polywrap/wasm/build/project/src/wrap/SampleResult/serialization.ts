import {
  Read,
  ReadDecoder,
  Write,
  WriteSizer,
  WriteEncoder,
  Box,
  BigInt,
  BigNumber,
  JSON,
  Context
} from "@polywrap/wasm-as";
import { SampleResult } from "./";
import * as Types from "..";

export function serializeSampleResult(type: SampleResult): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) object-type: SampleResult");
  const sizer = new WriteSizer(sizerContext);
  writeSampleResult(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) object-type: SampleResult");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeSampleResult(encoder, type);
  return buffer;
}

export function writeSampleResult(writer: Write, type: SampleResult): void {
  writer.writeMapLength(1);
  writer.context().push("result", "string", "writing property");
  writer.writeString("result");
  writer.writeString(type.result);
  writer.context().pop();
}

export function deserializeSampleResult(buffer: ArrayBuffer): SampleResult {
  const context: Context = new Context("Deserializing object-type SampleResult");
  const reader = new ReadDecoder(buffer, context);
  return readSampleResult(reader);
}

export function readSampleResult(reader: Read): SampleResult {
  let numFields = reader.readMapLength();

  let _result: string = "";
  let _resultSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "result") {
      reader.context().push(field, "string", "type found, reading property");
      _result = reader.readString();
      _resultSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_resultSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'result: String'"));
  }

  return {
    result: _result
  };
}
