const test = require("ava");
const checkout = require("../../lib/solutions/checkout");

test("check out without buying any items", t => {
  const total = checkout("");
  t.is(total, 0);
});

test("check out a single item", t => {
  const total = checkout("A");
  t.is(total, 50);
});

test("check out a different item", t => {
  const total = checkout("B");
  t.is(total, 30);
});

test("check out multiple items", t => {
  const total = checkout("BCD");
  t.is(total, 65);
});
