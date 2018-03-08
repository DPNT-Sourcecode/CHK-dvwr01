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
  E: 40,
  F: 10,
  G: 20,
  H: 10,
  I: 35,
  J: 60,
  K: 80,
  L: 90,
  M: 15,
  N: 40,
  O: 10,
  P: 50,
  Q: 30,
  R: 50,
  S: 30,
  T: 20,
  U: 40,
  V: 50,
  W: 20,
  X: 90,
  Y: 10,
  Z: 50
};

const eq = a => b => a === b;

const skusMatching = (needle, haystack) => haystack.filter(eq(needle)).length;

const remove = (count, needle, haystack) => {
  const result = [];
  let remaining = count;
  for (let value of haystack) {
    if (value === needle && remaining > 0) {
      remaining--;
    } else {
      result.push(value);
    }
  }
  return result;
};

const multipleItems = (item, count, amount) => skus => {
  const numberToDiscount = Math.floor(skusMatching(item, skus) / count);
  return {
    discount: numberToDiscount * (amount - prices[item] * count),
    skus: remove(numberToDiscount * count, item, skus)
  };
};

const getOneFree = (item, count, itemToDiscount) => skus => {
  const numberToDiscount = Math.min(
    Math.floor(skusMatching(item, skus) / count),
    Math.floor(skusMatching(itemToDiscount, skus))
  );
  return {
    discount: numberToDiscount * -prices[itemToDiscount],
    skus: remove(numberToDiscount, itemToDiscount, skus)
  };
};

const discounts = [
  getOneFree("E", 2, "B"),
  getOneFree("N", 3, "M"),
  getOneFree("R", 3, "Q"),
  multipleItems("A", 5, 200),
  multipleItems("A", 3, 130),
  multipleItems("B", 2, 45),
  multipleItems("F", 3, prices.F * 2),
  multipleItems("H", 10, 80),
  multipleItems("H", 5, 45),
  multipleItems("K", 2, 150),
  multipleItems("P", 5, 200),
  multipleItems("Q", 3, 80),
  multipleItems("U", 4, prices.U * 3),
  multipleItems("V", 3, 130),
  multipleItems("V", 2, 90)
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
