var id64 = require('..');
var assert = require('assert');

function genIds(n, reversible) {
  n = n || 10;
  var ids = [];
  var uuids = [];
  for (i = 0; i < n; i++) {
    var id = id64.gen(reversible, true);
    ids.push(id[0]);
    uuids.push(id[1]);
  }
  return {ids, uuids};
}

function checkIds(reversible) {
  var obj = genIds(10, reversible);
  var sids = Array.from(obj.ids);
  sids.sort();
  var len = reversible ? 22 : 20;
  obj.ids.forEach((id, i) => {
    assert(id.length === len, 'wrong length');
    assert(id.replace(/[A-Za-z0-9._]/g, '') === '', 'bad characters');
    assert(sids[i] === id, 'not sorted properly');
    if (reversible) assert(obj.uuids[i] === id64.ungen(id), 'not reversible');
  });
}

module.exports = {genIds: genIds, checkIds: checkIds};
