import { InvalidFileTypeError } from '../errors/InvalidFileTypeError';
import { NestingLevelTooDeepError } from '../errors/NestingLevelTooDeepError';
import { Document } from '../types/Document';
import { isEmptyObject } from './isEmptyObject';
import { MULTI_VALUE_KEYS, UNIQUE_OBJECT_KEYS } from './keys';

const OBJECT_ENTRYPOINT_REGEX = /^([a-zA-Z0-9_]+)\.$/;
const OBJECT_FINISHPOINT_REGEX = /^\.$/;
const KV_REGEX = /^([a-zA-Z0-9_]+)=(.*)$/;

const RECURSION_DEPTH_LIMIT = 10;

export class Oud2JSON {
  private sources: string[];
  private output: Document;

  constructor(sources: string[]) {
    this.sources = sources;
    this.output = {};
  }

  parse(): string {
    const { parent: doc } = this.makeObj(this.output, 0, 0);

    if (isEmptyObject(doc)) {
      throw new InvalidFileTypeError();
    }
    return JSON.stringify(doc);
  }

  private makeObj(parent: Document, pointer: number, depth: number): { parent: Document; idx: number } {
    if (depth >= RECURSION_DEPTH_LIMIT) throw new NestingLevelTooDeepError();

    for (let idx = pointer; idx < this.sources.length; idx++) {
      const line = this.sources[idx];
      if (!line) continue;

      const keyValueMatcher = line.match(KV_REGEX);
      if (keyValueMatcher) {
        const key = keyValueMatcher[1];
        const value = (keyValueMatcher[2] ?? '').trimEnd();
        if (key) {
          if (!MULTI_VALUE_KEYS.includes(key) && !(key in parent)) {
            parent = { ...parent, [key]: value };
          }
          if (MULTI_VALUE_KEYS.includes(key) && !!value) {
            parent = {
              ...parent,
              [key]: key in parent && Array.isArray(parent[key]) ? [...(parent[key] as string[]), value] : [value],
            };
          }
        }
        continue;
      }

      const objectEntrypointMatcher = line.match(OBJECT_ENTRYPOINT_REGEX);
      if (objectEntrypointMatcher && objectEntrypointMatcher[1]) {
        const objectName = objectEntrypointMatcher[1];
        const current = parent[objectName];
        if (typeof current === 'string') {
          throw new InvalidFileTypeError();
        }
        const isUniqueKey = UNIQUE_OBJECT_KEYS.includes(objectName);

        const newObj: Document = {};
        const { parent: updatedObj, idx: nextPointer } = this.makeObj(newObj, idx + 1, depth + 1);

        if (isUniqueKey) {
          const currentObj = (current as Document) ?? {};
          parent = { ...parent, [objectName]: { ...currentObj, ...updatedObj } };
        } else {
          const currentArr = (current as Document[]) ?? [];
          parent = { ...parent, [objectName]: [...currentArr, updatedObj] };
        }
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
