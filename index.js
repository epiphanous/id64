var uuid = require('uuid');
var d64 = require('d64');

function gen(reversible) {
  reversible = !!reversible;
  var buf = new Array(16);
  uuid.v1(null, buf, 0);
  var a = reversible ?
  [
    buf[6], buf[7], buf[4], buf[5], buf[0], buf[1], buf[2], buf[3],
    buf[8], buf[9], buf[10], buf[11], buf[12], buf[13], buf[14], buf[15]
  ] :
  [
    buf[6], buf[7], buf[4], buf[5], buf[0], buf[1], buf[2], buf[3],
    buf[9], buf[10], buf[11], buf[12], buf[13], buf[14], buf[15]
  ];
  return d64.encode(Buffer.from(a));
}

function ungen(id, k) {
  var z = k || 17;
  var b = d64.decode(id);
  if (b.length == 15) {
    var k = Math.floor(Math.random()*256);
    b = Buffer.from([b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7],
        z, b[8], b[9], b[10], b[11], b[12], b[13], b[14]]);
  }
  return format_uuid(Buffer.from([
      b[4], b[5], b[6], b[7], b[2], b[3], b[0], b[1],
      b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15]
  ]));
}

function format_uuid(b) {
  var s = b.toString('hex');
  return s.substr(0,8) + '-' + s.substr(8,4) + '-' + s.substr(12,4) + '-' + s.substr(16,4) + '-' + s.substr(20,12);
}

module.exports = {
  gen: gen,
  ungen: ungen
};
