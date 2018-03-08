"use strict";

module.exports = friendName => {
  if (!friendName) {
    return "Hello, World!";
  }
  return `Hello, ${friendName}!`;
};
