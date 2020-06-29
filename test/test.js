const lib = require('./lib');

// non-reversible
lib.checkIds(false);

// reversible
lib.checkIds(true);

// times
lib.checkTime(true);

// from uuid
lib.checkFromUuid(true);
