const id64 = require('..');
const assert = require('assert');

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function genIds(n, reversible) {
  n = n || 10;
  const ids = [];
  const uuids = [];
  for (i = 0; i < n; i++) {
    const id = id64.gen(reversible, true);
    ids.push(id[0]);
    uuids.push(id[1]);
    sleep(100);
  }
  //console.log(ids);
  return {ids, uuids};
}

function checkIds(reversible) {
  const obj = genIds(10, reversible);
  const sids = Array.from(obj.ids);
  sids.sort();
  const len = reversible ? 22 : 20;
  obj.ids.forEach((id, i) => {
    assert(id.length === len, 'wrong length');
    assert(id.replace(/[A-Za-z0-9._]/g, '') === '', 'bad characters');
    assert(sids[i] === id, 'not sorted properly');
    if (reversible) assert(obj.uuids[i] === id64.ungen(id), 'not reversible');
    assert(id64.ungen(id) === id64.uuid(id), 'uuid() method error');
  });
}

function checkTime(reversible) {
  const obj = genIds(10, reversible);
  const sids = Array.from(obj.ids);
  sids.forEach((id, i) => {
    const ticks = id64.ticks(id);
    const micros = id64.micros(id);
    const millis = id64.millis(id);
    const date = id64.date(id);
    const uuid = id64.uuid(id);
    //console.log({id,uuid,ticks,micros,millis,date});
    assert.equal(micros, Math.floor((ticks-id64.GREGORIAN_OFFSET)/10));
    assert.equal(millis, Math.floor(micros/1000));
    assert.equal(date.getTime(), millis);
  });
}

function checkFromUuid(reversible) {
  const {ids, uuids} = genIds(10, reversible);
  for (let i=0; i<ids.length; i++) {
    assert(ids[i] === id64.from_uuid(uuids[i], reversible));
  }
}

module.exports = {genIds: genIds, checkIds: checkIds, checkTime: checkTime, checkFromUuid:checkFromUuid};
