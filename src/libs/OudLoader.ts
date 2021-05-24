import * as Encoder from 'encoding-japanese';
import { InvalidFileTypeError } from '../errors/InvalidFileTypeError';
import { Document } from '../types/Document';

const OBJECT_ENTRYPOINT_REGEX = /^([a-zA-Z0-9_]+)\.$/;
const OBJECT_FINISHPOINT_REGEX = /^\.$/;
const KV_REGEX = /^([a-zA-Z0-9_]+)=(.*)$/;

export class OudLoader {
  private fileBuffer: Buffer;
  private sources: string[];
  private output: Document;

  constructor(fileBuffer: Buffer) {
    this.fileBuffer = fileBuffer;
    this.output = {};

    const encoding = Encoder.detect(this.fileBuffer, ['SJIS', 'UTF8']);
    if (!encoding) {
      throw new InvalidFileTypeError();
    }

    this.sources = Encoder.convert(this.fileBuffer, {
      to: 'UNICODE',
      from: encoding,
      type: 'string',
      bom: false,
    }).split('\n');
  }

  parse(): string {
    const { parent: doc } = this.makeObj(this.output, 0);
    return JSON.stringify(doc);
  }

  private makeObj(parent: Document, pointer: number): { parent: Document; idx: number } {
    for (let idx = pointer; idx < this.sources.length; idx++) {
      const line = this.sources[idx];
      if (!line) continue;

      const keyValueMatcher = line.match(KV_REGEX);
      if (keyValueMatcher) {
        const key = keyValueMatcher[1];
        const value = keyValueMatcher[2];
        if (key && !Object.prototype.hasOwnProperty.call(parent, key)) {
          parent = { ...parent, [key]: value ?? '' };
        }
        continue;
      }

      const objectEntrypointMatcher = line.match(OBJECT_ENTRYPOINT_REGEX);
      if (objectEntrypointMatcher && objectEntrypointMatcher[1]) {
        const objectName = objectEntrypointMatcher[1];
        let current = parent[objectName];
        if (typeof current === 'string') {
          throw new InvalidFileTypeError();
        } else if (!current) {
          current = [];
          parent = { ...parent, [objectName]: current };
        }
        const newObj: Document = {};
        const { parent: updatedObj, idx: nextPointer } = this.makeObj(newObj, idx + 1);
        current.push(updatedObj);
        parent[objectName] = current;
        idx = nextPointer;
        continue;
      }

      const objectFinishpointMatcher = line.match(OBJECT_FINISHPOINT_REGEX);
      if (objectFinishpointMatcher) {
        return { parent, idx };
      }
    }

    return { parent, idx: -1 };
  }
}
