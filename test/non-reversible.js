var id64 = require('..');

for (var i = 0; i < 10; i++) {
  var id = id64.gen();
  console.log('non-reversible', i, id);
}
