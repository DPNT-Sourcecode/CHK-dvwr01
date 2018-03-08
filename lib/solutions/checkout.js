"use strict";

const sum = require("./sum");

// +------+-------+----------------+
// | Item | Price | Special offers |
// +------+-------+----------------+
// | A    | 50    | 3A for 130     |
// | B    | 30    | 2B for 45      |
// | C    | 20    |                |
// | D    | 15    |                |
// +------+-------+----------------+

const prices = {
  A: 50,
  B: 30,
  C: 20,
  D: 15
};

const eq = a => b => a === b;

const discounts = [
  skus => (skus.filter(eq("A")).length === 3 ? -20 : 0),
  skus => (skus.filter(eq("B")).length === 2 ? -15 : 0)
];

module.exports = skusString => {
  const skus = Array.from(skusString);
  const subtotal = skus.map(sku => prices[sku]).reduce(sum, 0);
  const discounted = discounts.map(discount => discount(skus)).reduce(sum);
  return subtotal + discounted;
};
