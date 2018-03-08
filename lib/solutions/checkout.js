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
  K: 70,
  L: 90,
  M: 15,
  N: 40,
  O: 10,
  P: 50,
  Q: 30,
  R: 50,
  S: 20,
  T: 20,
  U: 40,
  V: 50,
  W: 20,
  X: 17,
  Y: 20,
  Z: 21
};

const by = mapping => (a, b) => {
  const mappedA = mapping(a);
  const mappedB = mapping(b);
  if (mappedA < mappedB) {
    return -1;
  } else if (mappedA > mappedB) {
    return 1;
  } else {
    return 0;
  }
};

const oneOf = items => value => items.includes(value);

const repeat = (value, count) => Array.from(Array(count), () => value);

const skusMatching = (items, array) => array.filter(oneOf(items));

const remove = (items, array) => {
  const result = [];
  for (let value of array) {
    if (items.includes(value)) {
      items = removeFirst(value, items);
    } else {
      result.push(value);
    }
  }
  return result;
};

const removeFirst = (value, array) => {
  const result = [];
  let removed = false;
  for (let item of array) {
    if (item === value && !removed) {
      removed = true;
    } else {
      result.push(value);
    }
  }
  return result;
};

const multipleItems = (item, count, amount) => skus => {
  const match = skusMatching([item], skus);
  const numberToDiscount = Math.floor(match.length / count);
  return {
    discount: numberToDiscount * (amount - prices[item] * count),
    skus: remove(match.slice(0, numberToDiscount * count), skus)
  };
};

const anyOf = (items, count, amount) => skus => {
  const match = skusMatching(items, skus).sort(by(item => -prices[item]));
  const numberToDiscount = Math.floor(match.length / count);
  const itemsToDiscount = match.slice(0, numberToDiscount * count);
  return {
    discount:
      numberToDiscount * amount -
      itemsToDiscount.map(item => prices[item]).reduce(sum, 0),
    skus: remove(itemsToDiscount, skus)
  };
};

const getOneFree = (item, count, itemToDiscount) => skus => {
  const itemMatch = skusMatching([item], skus);
  const itemToDiscountMatch = skusMatching([itemToDiscount], skus);
  const numberToDiscount = Math.min(
    Math.floor(itemMatch.length / count),
    Math.floor(itemToDiscountMatch.length)
  );
  return {
    discount: numberToDiscount * -prices[itemToDiscount],
    skus: remove(repeat(itemToDiscount, numberToDiscount), skus)
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
  multipleItems("V", 2, 90),
  anyOf(["S", "T", "X", "Y", "Z"], 3, 45)
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
