var id64 = require('..');

for (var i = 0; i < 10; i++) {
  var id = id64.gen(true);
  var uuid = id64.ungen(id);
  console.log('    reversible', i, id, uuid);
}
