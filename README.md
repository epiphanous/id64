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
is 22 characters long. If you don't care about recovering the underlying uuid,
the generated identifier can be reduced to 20 characters.

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

This will return a 22-character id like: `3Ti0cL9b_Z1w0mTZvpk0WF`.

## UUIDs

You can recover the original v1 UUID encoded in the generated id64 id, 
as well as the time embedded in that uuid in several formats.

```javascript
const myID = id64.gen(); // eg, 3Ti0dNwMcl1ojbBHgw3W2.
const origUUID = id64.ungen(myID); // eg, 8f17a310-81a5-11eb-b4be-7312b3c1210c
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

If you don't care about recovering the underlying UUID, you can get a shorter, 20-character
id64 identifier by passing `false` to the `gen()` function:

```javascript
const shorterID = id64.gen(false); // eg, 3Ti0d_i1Fv0x9uTON9YK
```