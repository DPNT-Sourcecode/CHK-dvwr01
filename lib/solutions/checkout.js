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
  D: 15,
  E: 40
};

const eq = a => b => a === b;

const skusMatching = (needle, haystack) => haystack.filter(eq(needle)).length;

const discounts = [
  skus => ({
    discount: Math.floor(skusMatching("A", skus) / 3) * -20,
    skus: skus
  }),
  skus => {
    const numberToDiscount = Math.min(
      Math.floor(skusMatching("E", skus) / 2),
      Math.floor(skusMatching("B", skus))
    );
    return {
      discount: numberToDiscount * -prices.B,
      skus: skus
    };
  },
  skus => ({
    discount: Math.floor(skusMatching("B", skus) / 2) * -15,
    skus: skus
  })
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
  const discounted = discounts.reduce(
    ({ skus, amount }, discount) => {
      const applied = discount(skus);
      return { skus: applied.skus, amount: amount + applied.discount };
    },
    { skus, amount: 0 }
  ).amount;
  return subtotal + discounted;
};
