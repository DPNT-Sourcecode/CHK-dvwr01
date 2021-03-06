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

test("apply discounts to 3 As", t => {
  const total = checkout("AAA");
  t.is(total, 130);
});

test("apply discounts to 5 As", t => {
  const total = checkout("AAAAA");
  t.is(total, 200);
});

test("apply discounts to 2 Bs", t => {
  const total = checkout("BB");
  t.is(total, 45);
});

test("apply discounts with multiple SKUs of items", t => {
  const total = checkout("AAABBC");
  t.is(total, 195);
});

test("apply discounts with items in any order", t => {
  const total = checkout("ABABA");
  t.is(total, 175);
});

test("apply discounts to some but not all items with the same SKU", t => {
  const total = checkout("AAAA");
  t.is(total, 130 + 50);
});

test("discount a B when there are two Es", t => {
  const total = checkout("EEB");
  t.is(total, 80);
});

test("discount lots of Bs when there are twice as many Es", t => {
  const total = checkout("EEEEBBEEB");
  t.is(total, 240);
});

test("discount extra Bs as usual when there aren't enough Es", t => {
  const total = checkout("EEEEBBEEBBB");
  t.is(total, 240 + 45);
});

test("buy 2 Fs, get one F free", t => {
  const total = checkout("FFF");
  t.is(total, 20);
});

test("buy any 3 of S, T, X, Y or Z for 45 (STX)", t => {
  const total = checkout("STX");
  t.is(total, 45);
});

test("buy any 3 of S, T, X, Y or Z for 45 (XYZ)", t => {
  const total = checkout("XYZ");
  t.is(total, 45);
});

test("buy any 3 of S, T, X, Y or Z for 45 (YXT)", t => {
  const total = checkout("YXT");
  t.is(total, 45);
});

test('favour discounting more expensive items with an "any of" discount', t => {
  const total = checkout("STXYZ");
  t.is(total, 45 + 20 + 17);
});

test("apply multiple discounts with lots of items", t => {
  const total = checkout("AFABACADACABAFARQRQRQRSTXYZ");
  t.is(total, 200 + 130 + 45 + 20 + 20 + 15 + 20 + 60 + 200 + 45 + 20 + 17);
});

test("if there's an invalid SKU, return -1", t => {
  const total = checkout("foo");
  t.is(total, -1);
});

test("if the input isn't a string, return -1", t => {
  const total = checkout(99);
  t.is(total, -1);
});

test("if the input is undefined, return -1", t => {
  const total = checkout();
  t.is(total, -1);
});
