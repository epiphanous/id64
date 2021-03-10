import {
  gen,
  ungen,
  from_uuid,
  ticks,
  micros,
  millis,
  date,
  GREGORIAN_OFFSET,
} from './index';

describe('id64', () => {
  it('creates reversible ids of length 22', () => {
    const id = gen();
    const uuid = ungen(id);
    const id2 = from_uuid(uuid);
    expect(id).toEqual(id2);
    expect(id).toHaveLength(22);
  });

  it('uses valid characters only', () => {
    const id = gen();
    expect(id).toMatch(
      /^[.PYFGCRLAOEUIDHTNSQJKXBMWVZ_pyfgcrlaoeuidhtnsqjkxbmwvz1234567890]+$/
    );
  });

  it('creates non-reversible ids of length 20', () => {
    const id = gen(false);
    const uuid = ungen(id);
    const id2 = from_uuid(uuid);
    expect(id).not.toEqual(id2);
    expect(id).toHaveLength(20);
  });

  it('creates sortable reversible ids', () => {
    const id1 = gen();
    const id2 = gen();
    expect(id2 > id1).toBe(true);
  });

  it('creates sortable non-reversible ids', () => {
    const id1 = gen(false);
    const id2 = gen(false);
    expect(id2 > id1).toBe(true);
  });

  it('extracts time from id', () => {
    const id = gen();
    const t = ticks(id);
    const mc = micros(id);
    const ms = millis(id);
    const d = date(id);
    expect(mc).toEqual(Math.floor((t - GREGORIAN_OFFSET) / 10));
    expect(ms).toEqual(mc / 1000);
    expect(ms).toEqual(d.getTime());
  });
});
