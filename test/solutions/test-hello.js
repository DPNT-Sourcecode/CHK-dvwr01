const test = require("ava");
const hello = require("../../lib/solutions/hello");

test("say hello to the world", t => {
  const response = hello();
  t.is(response, "Hello, World!");
});
