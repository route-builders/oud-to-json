import * as fs from 'fs';
import * as path from 'path';
import { JSON2Oud } from '../../src/libs/JSON2Oud';

describe('JSON2Oud', () => {
  describe('JSON2Oud#parse', () => {
    test('parse with valid data', async () => {
      const { default: expected } = await import('./resources/mock/ressya_patterns');
      const oudFileLines = fs.readFileSync(path.join(__dirname, './resources/mock/ressya_patterns.oud'), 'utf8');

      const ins = new JSON2Oud(JSON.stringify(expected));
      const result = ins.parse();

      expect(result).toBe(oudFileLines);
    });
    test('parse with `Ressya` directive data', async () => {
      // read sample data
      const { default: expected } = await import('./resources/mock/empty_ressya_patterns');
      const oudFileLines = fs.readFileSync(path.join(__dirname, './resources/mock/empty_ressya_patterns.oud'), 'utf8');

      const ins = new JSON2Oud(JSON.stringify(expected));
      const result = ins.parse();

      expect(result).toBe(oudFileLines);
    });
  });
});
