import { META_FIELD_KEYNAME } from './constants';
import { MULTI_VALUE_KEYS } from './keys';

export class JSON2Oud {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private jsonSource: any;
  private output: string;

  constructor(json: string) {
    this.jsonSource = JSON.parse(json);
    this.output = '';
  }

  parse(): string {
    const lines = this.makeOud(this.jsonSource);
    this.output = lines.join('\n');
    return this.output;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private makeOud(obj: any): string[] {
    const lines: string[] = [];
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key === META_FIELD_KEYNAME) {
          continue;
        }

        const item = obj[key];
        if (typeof item === 'string') {
          lines.push(this.oudKV(key, item));
          continue;
        }
        if (MULTI_VALUE_KEYS.includes(key) && Array.isArray(item)) {
          for (const child of item) {
            lines.push(this.oudKV(key, child));
          }
          continue;
        }
        if (Array.isArray(item)) {
          const children: string[] = [];
          for (const child of item) {
            children.push(`${key}.`);
            children.push(...this.makeOud(child));
            children.push('.');
          }
          lines.push(...children);
          continue;
        }
        // object
        lines.push(`${key}.`);
        lines.push(...this.makeOud(item));
        lines.push('.');
      }
    }

    return lines;
  }

  private oudKV(key: string, value: string): string {
    return `${key}=${value}`;
  }
}
