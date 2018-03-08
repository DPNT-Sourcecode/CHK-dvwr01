const test = require("ava");
var sum = require("../../lib/solutions/sum");

test("compute sum", t => {
  t.is(sum(1, 2), 3);
});
