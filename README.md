# id64

Javascript library that generates short identifiers that are
time-sortable,
url-safe,
lexicographically stable,
and
globally unique.

The identifiers are composed from the characters:

```
[A-Z][a-z][0-9]_\.
```

We first generate a uuid (with Kelektiv's 
[node-uuid](https://github.com/kelektiv/node-uuid) 
library). We then shift the bits around to make it time sortable and finally encode it with Dominic Tarr's very cool
[d64](https://github.com/dominictarr/d64). The result is
time sortable, globally unique, lexicographically, stable, url-safe,
identifier that is 20 characters long. If you want to be able to recover the underlying uuid, the generated identifier will be 22 characters.

## Install

With yarn:
```bash
yarn add id64
```

With npm:
```
npm install id64
```

## Usage

For ES5 environments:
```javascript
var id64 = require('id64');
var id = id64.gen();
```

For ES6/ES7 environments:
```javascript
import id64 from 'id64';
const id = id64.gen();
```

This will return a 20-character id like: `3TYQYVHzfb4.uS27PQMZ`.

To generate a *reversible* id (ie, you can recover the original uuid that underlies it), pass `true` into the `gen()` method. This will return a 22-character id like: `3TYQYVICro9NORZ_LrrG8F`.
