import d64 from 'd64';
import { v1 as uuidv1 } from 'uuid';

/**
 * Generate an id
 */
export const gen = (reversible: boolean = true): string => {
  const buf = new Array<number>(16);
  uuidv1(null, buf, 0);
  return d64.encode(Buffer.from(_shuffle(buf, reversible)));
};

export const from_uuid = (uuid: string, reversible: boolean = true) => {
  const buf = new Array<number>(16);
  let i = 0;
  uuid
    .toLowerCase()
    .match(/[0-9a-f]{2}/g)
    .forEach(oct => {
      if (i < 16) {
        buf[i++] = _h2b[oct];
      }
    });
  while (i < 16) {
    buf[i++] = 0;
  }
  return d64.encode(Buffer.from(_shuffle(buf, reversible)));
};

/**
 * Return the uuid of the id
 */
export const ungen = (id: string) => {
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
};

/**
 * Return the uuid of the id (alias for ungen)
 */
export const uuid = (id: string) => ungen(id);

export const to_uuid = (id: string) => ungen(id);

/**
 * Return ticks of the id (since the gregorian epoch)
 */
export const ticks = (id: string) => {
  const uuid = ungen(id).split('-');
  return parseInt([uuid[2].substring(1), uuid[1], uuid[0]].join(''), 16);
};

/**
 * Return microseconds of the id (since the unix epoch)
 */
export const micros = (id: string) => {
  const t = ticks(id);
  return Math.floor((t - GREGORIAN_OFFSET) / 10);
};

/**
 * Return milliseconds of the id (since the unix epoch)
 */
export const millis = (id: string) => {
  const t = micros(id);
  return Math.floor(t / 1000);
};

/**
 * Return the date of the id
 */
export const date = (id: string) => {
  return new Date(millis(id));
};

const _shuffle = (buf: ArrayLike<number>, reversible: boolean = true) =>
  reversible
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

const format_uuid = (b: Buffer) => {
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
};

export const GREGORIAN_OFFSET = 122192928000000000;

const _h2b: Record<string, number> = Array.from(Array(256).keys()).reduce(
  (h, i) => {
    h[(i + 0x100).toString(16).substr(1)] = i;
    return h;
  },
  {}
);

const id64 = {
  gen,
  from_uuid,
  ungen,
  uuid,
  to_uuid,
  ticks,
  micros,
  millis,
  date,
  GREGORIAN_OFFSET,
};
export default id64;
