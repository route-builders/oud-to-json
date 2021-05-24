import { readFileSync, writeFileSync } from 'fs';
import { OudLoader } from './src/index';

const buffer = readFileSync('./sample.oud2');
// const buffer = readFileSync('./20180317jr_chuo_line.oud');
const loader = new OudLoader(buffer);
writeFileSync('result.json', loader.parse());
