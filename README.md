# oud-to-json

Convert between .oud and .json .

**Document**  
https://doc.route.builders/oud-to-json/

## usage

### .oud -> .json

```ts
const { readFileSync, writeFileSync } = require('fs');
const { Oud2JSON } = require('@route-builders/oud-to-json');

const buffer = readFileSync('/path/to/file.oud');
const oj = new Oud2JSON(buffer);
writeFileSync('result.json', oj.parse());
```

### .json -> .oud

```ts
const { writeFileSync } = require('fs');
const { JSON2Oud } = require('@route-builders/oud-to-json');

const json = '{"FileType":"OuDia.1.02","Rosen": ... }';
const jo = new JSON2Oud(json);
writeFileSync('result.oud', jo.parse());
```

## developer

- up-tri <yaki-shake@up-tri.me>

## LICENSE

under the MIT License.
