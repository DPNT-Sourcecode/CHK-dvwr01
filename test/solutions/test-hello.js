const test = require("ava");
const hello = require("../../lib/solutions/hello");

test("say hello to the world", t => {
  const response = hello();
  t.is(response, "Hello, World!");
});

test("say hello to your friend", t => {
  const response = hello("John");
  t.is(response, "Hello, John!");
});
