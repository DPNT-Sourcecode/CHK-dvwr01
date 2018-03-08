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

const discounts = [
  skus => (skus.indexOf("AAA") >= 0 ? -20 : 0),
  skus => (skus.indexOf("BB") >= 0 ? -15 : 0)
];

module.exports = skus => {
  const subtotal = Array.from(skus)
    .map(sku => prices[sku])
    .reduce(sum, 0);
  const discounted = discounts.map(discount => discount(skus)).reduce(sum);
  return subtotal + discounted;
};
