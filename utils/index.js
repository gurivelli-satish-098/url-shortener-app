const { BASE62_ALPHABET, ENCODED_BASE } = require("../constants");

const getEncodedValue = (number) => {
  if (number === 0) return "0";
  let encoded = "";
  while (number > 0) {
    encoded = BASE62_ALPHABET[number % ENCODED_BASE] + encoded;
    number = Math.floor(number / ENCODED_BASE);
  }
  return encoded;
};

const getDecodedValue = (str) => {
  return str.split("").reduce((acc, char) => acc * ENCODED_BASE + BASE62_ALPHABET.indexOf(char), 0);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = { getEncodedValue, getDecodedValue, isValidEmail };
