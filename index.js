const {v1: uuidv1} = require('uuid');
const d64 = require('d64');

const GREGORIAN_OFFSET = 122192928000000000;

/**
 * Generate an id
 */
function gen(reversible, test) {
  reversible = !!reversible;
  test = !!test;
  const buf = new Array(16);
  uuidv1(null, buf, 0);
  const a = reversible
    ? [
        buf[6],
        buf[7],
        buf[4],
        buf[5],
        buf[0],
        buf[1],
        buf[2],
        buf[3],
        buf[8],
        buf[9],
        buf[10],
        buf[11],
        buf[12],
        buf[13],
        buf[14],
        buf[15],
      ]
    : [
        buf[6],
        buf[7],
        buf[4],
        buf[5],
        buf[0],
        buf[1],
        buf[2],
        buf[3],
        buf[9],
        buf[10],
        buf[11],
        buf[12],
        buf[13],
        buf[14],
        buf[15],
      ];
  const id = d64.encode(Buffer.from(a));
  return test ? [id, format_uuid(Buffer.from(buf))] : id;
}

/**
 * Return the uuid of the id
 */
function ungen(id) {
  const z = 17;
  let b = d64.decode(id);
  if (b.length == 15) {
    b = Buffer.from([
      b[0],
      b[1],
      b[2],
      b[3],
      b[4],
      b[5],
      b[6],
      b[7],
      z,
      b[8],
      b[9],
      b[10],
      b[11],
      b[12],
      b[13],
      b[14],
    ]);
  }
  return format_uuid(
    Buffer.from([
      b[4],
      b[5],
      b[6],
      b[7],
      b[2],
      b[3],
      b[0],
      b[1],
      b[8],
      b[9],
      b[10],
      b[11],
      b[12],
      b[13],
      b[14],
      b[15],
    ])
  );
}

/**
 * Return the uuid of the id
 */
function uuid(id) {
  return ungen(id);
}

function format_uuid(b) {
  const s = b.toString('hex');
  return (
    s.substr(0, 8) +
    '-' +
    s.substr(8, 4) +
    '-' +
    s.substr(12, 4) +
    '-' +
    s.substr(16, 4) +
    '-' +
    s.substr(20, 12)
  );
}

/**
 * Return ticks of the id (since the gregorian epoch)
 */
function ticks(id) {
  const uuid = ungen(id).split('-');
  return parseInt([uuid[2].substring(1), uuid[1], uuid[0]].join(''), 16);
}

/**
 * Return microseconds of the id (since the unix epoch)
 */
function micros(id) {
  const t = ticks(id);
  return Math.floor((t - GREGORIAN_OFFSET) / 10);
}

/**
 * Return milliseconds of the id (since the unix epoch)
 */
function millis(id) {
  const t = micros(id);
  return Math.floor(t / 1000);
}

/**
 * Return the date of the id
 */
function date(id) {
  return new Date(millis(id));
}

module.exports = {
  GREGORIAN_OFFSET: GREGORIAN_OFFSET,
  gen: gen,
  ungen: ungen,
  uuid: uuid,
  ticks: ticks,
  micros: micros,
  millis: millis,
  date: date
};
