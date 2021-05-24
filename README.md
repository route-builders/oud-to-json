# oud-to-json

## usage

```ts
const { readFileSync, writeFileSync } = require('fs');
const { OudLoader } = require('@route-builders/oud-to-json');

const buffer = readFileSync('/path/to/file.oud');
const loader = new OudLoader(buffer);
writeFileSync('result.json', loader.parse());
```

## developer

- up-tri <yaki-shake@up-tri.me>

## LICENSE

under the MIT License.
