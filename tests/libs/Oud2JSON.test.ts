import * as fs from 'fs';
import * as path from 'path';
import { InvalidFileTypeError } from '../../src/errors/InvalidFileTypeError';
import { NestingLevelTooDeepError } from '../../src/errors/NestingLevelTooDeepError';
import { Oud2JSON } from '../../src/libs/Oud2JSON';

describe('Oud2JSON', () => {
  describe('Oud2JSON#parse', () => {
    test('parse with valid data', async () => {
      const oudFileLines = fs
        .readFileSync(path.join(__dirname, './resources/mock/ressya_patterns.oud'), 'utf8')
        .split('\n');

      const ins = new Oud2JSON(oudFileLines);
      const result = ins.parse();
      const { default: expected } = await import('./resources/mock/ressya_patterns');

      expect(JSON.parse(result)).toStrictEqual(expected);
    });
    test('raise error with invalid data', async () => {
      const oudFileLines = `
      FileType=OuDia.1.02
      Rosen.
      Rosenmei=eki_patterns
      Eki.
      `.split('\n');

      const ins = new Oud2JSON(oudFileLines);
      expect(() => {
        ins.parse();
      }).toThrowError(InvalidFileTypeError);
    });
    test('raise error with invalid data (2)', async () => {
      const oudFileLines = fs
        .readFileSync(path.join(__dirname, './resources/mock/invalid_file_pattern.oud'), 'utf8')
        .split('\n');

      const ins = new Oud2JSON(oudFileLines);
      expect(() => {
        ins.parse();
      }).toThrowError(NestingLevelTooDeepError);
    });
  });
});
