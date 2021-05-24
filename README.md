# oud-to-json

```ts
import { readFileSync, writeFileSync } from 'fs';
import { OudLoader } from '/path/to/OudLoader';

const buffer = readFileSync('/path/to/file.oud');
const loader = new OudLoader(buffer);
writeFileSync('result.json', loader.parse());
```

## developer

- up-tri <yaki-shake@up-tri.me>

## LICENSE

under the MIT License.
