# id64

Javascript library that generates short identifiers that are time-sortable,
url-safe, lexicographically stable, and globally unique.

The identifiers are composed from the characters:

```
[A-Z][a-z][0-9]_\.
```

We first generate a v1 uuid with Kelektiv's
[node-uuid](https://github.com/kelektiv/node-uuid) library. We then shift the
bits around to make it time sortable and finally encode it with Dominic Tarr's
very cool [d64](https://github.com/dominictarr/d64). The result is a time
sortable, globally unique, lexicographically, stable, url-safe, identifier that
is 20 characters long. If you want to be able to recover the underlying uuid,
the generated identifier will be 22 characters.

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

For ES6+ environments:
```javascript
import id64 from 'id64';
const id = id64.gen();
```

This will return a 20-character id like: `3TYQYVHzfb4.uS27PQMZ`.

To generate a *reversible* id (ie, you can recover the original uuid that underlies it), pass `true` into the `gen()` method. This will return a 22-character id like: `3TYQYVICro9NORZ_LrrG8F`, which you can reverse like so:

```javascript
const myID = id64.gen(true); // eg, 3TcMNgcF_a1dVs4SVc4vtF
const origUUID = id64.ungen(myID); // eg, ca109660-1762-11ea-a983-815d82817be5
```

You can also recover the underlying timestamp of the id in several formats:

```javascript
const id     = id64.gen();
                                // timestamp of the id as...
const ticks  = id64.ticks(id);  // 100-nanonsecond intervals since gregorian epoch
const micros = id64.micros(id); // microseconds since unix epoch
const millis = id64.millis(id); // milliseconds since unix epoch
const date   = id64.date(id);   // a javascript Date
```
