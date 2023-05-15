import {Writable} from "stream"
import {inspect} from "util"

export class BufferStream extends Writable {
  private readonly buffers: Buffer[] = []

  _write(
    chunk: Buffer | string,
    encoding: string,
    callback: (err?: Error) => void,
  ) {
    if (typeof chunk === "string") chunk = Buffer.from(chunk)
    this.buffers.push(chunk)
    callback()
    return true
  }

  clear() {
    this.buffers.length = 0
  }

  [inspect.custom]() {
    return Buffer.concat(this.buffers).toString()
  }

  toString() {
    return Buffer.concat(this.buffers).toString()
  }
}

export default BufferStream
