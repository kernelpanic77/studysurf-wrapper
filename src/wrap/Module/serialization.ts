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
import * as Types from "..";

export class Args_sampleMethod {
  arg: string;
}

export function deserializesampleMethodArgs(argsBuf: ArrayBuffer): Args_sampleMethod {
  const context: Context = new Context("Deserializing module-type: sampleMethod Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _arg: string = "";
  let _argSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "arg") {
      reader.context().push(field, "string", "type found, reading property");
      _arg = reader.readString();
      _argSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_argSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'arg: String'"));
  }

  return {
    arg: _arg
  };
}

export function serializesampleMethodArgs(args: Args_sampleMethod): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: sampleMethod Args");
  const sizer = new WriteSizer(sizerContext);
  writesampleMethodArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: sampleMethod Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesampleMethodArgs(encoder, args);
  return buffer;
}

export function writesampleMethodArgs(
  writer: Write,
  args: Args_sampleMethod
): void {
  writer.writeMapLength(1);
  writer.context().push("arg", "string", "writing property");
  writer.writeString("arg");
  writer.writeString(args.arg);
  writer.context().pop();
}

export function serializesampleMethodResult(result: Types.SampleResult): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: sampleMethod Result");
  const sizer = new WriteSizer(sizerContext);
  writesampleMethodResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: sampleMethod Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesampleMethodResult(encoder, result);
  return buffer;
}

export function writesampleMethodResult(writer: Write, result: Types.SampleResult): void {
  writer.context().push("sampleMethod", "Types.SampleResult", "writing property");
  Types.SampleResult.write(writer, result);
  writer.context().pop();
}

export function deserializesampleMethodResult(buffer: ArrayBuffer): Types.SampleResult {
  const context: Context = new Context("Deserializing module-type: sampleMethod Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("sampleMethod", "Types.SampleResult", "reading function output");
  const object = Types.SampleResult.read(reader);
  const res: Types.SampleResult =  object;
  reader.context().pop();

  return res;
}
