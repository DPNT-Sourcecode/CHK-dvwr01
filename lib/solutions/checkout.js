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

const skusMatching = (needle, haystack) => haystack.filter(eq(needle)).length;

const discounts = [
  skus => Math.floor(skusMatching("A", skus) / 3) * -20,
  skus => Math.floor(skusMatching("B", skus) / 2) * -15
];

module.exports = skusString => {
  if (typeof skusString !== "string") {
    return -1;
  }
  const skus = Array.from(skusString);
  if (!skus.every(sku => prices[sku])) {
    return -1;
  }
  const subtotal = skus.map(sku => prices[sku]).reduce(sum, 0);
  const discounted = discounts.map(discount => discount(skus)).reduce(sum);
  return subtotal + discounted;
};
