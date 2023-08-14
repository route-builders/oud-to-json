import * as fs from 'fs';
import * as path from 'path';
import { InvalidFileContentError } from '../../src/errors/InvalidFileContentError';
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
    test('parse with empty `Ressya` directive data', async () => {
      // read sample data
      const oudFileLines = fs
        .readFileSync(path.join(__dirname, './resources/mock/empty_ressya_patterns.oud'), 'utf8')
        .split('\n');

      const ins = new Oud2JSON(oudFileLines);
      const result = ins.parse();
      const { default: expected } = await import('./resources/mock/empty_ressya_patterns');

      expect(JSON.parse(result)).toStrictEqual(expected);
    });
    test('raise error with invalid data', async () => {
      const oudFileLines = `
      FileType=OuDia.1.02
      Rosen.
      Rosenmei=eki_patterns
      Eki.
      FileTypeAppComment=OuDia Ver. 1.02.02
      `.split('\n');

      expect(() => {
        const ins = new Oud2JSON(oudFileLines);
        ins.parse();
      }).toThrowError(InvalidFileContentError);
    });
    test('raise error with invalid data (2)', async () => {
      const oudFileLines = fs
        .readFileSync(path.join(__dirname, './resources/mock/too_deep_file_pattern.oud'), 'utf8')
        .split('\n');

      expect(() => {
        const ins = new Oud2JSON(oudFileLines);
        ins.parse();
      }).toThrowError(NestingLevelTooDeepError);
    });
    test('raise error with empty data', async () => {
      const oudFileLines = [''];

      expect(() => {
        const ins = new Oud2JSON(oudFileLines);
        ins.parse();
      }).toThrowError(InvalidFileContentError);
    });
  });
});
