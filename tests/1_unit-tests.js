const { assert } = require("chai");
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("ConvertHandler", function () {
    test("should correctly read a whole number input", () => {
      const number = convertHandler.getNum("24km");
      assert.isNumber(number);
      assert.strictEqual(number, 24);
    });
    test("should correctly read a decimal number input", () => {
      const decimal = convertHandler.getNum("77.6mi");
      assert.isNumber(decimal);
      assert.strictEqual(decimal, 77.6);
    });
    test("should correctly read a fractional input", () => {
      const whole = convertHandler.getNum("9/3L");
      assert.isNumber(whole);
      assert.strictEqual(whole, 3);
      const decimal = convertHandler.getNum("1/2gal");
      assert.isNumber(decimal);
      assert.strictEqual(decimal, 0.5);
    });
    test("should correctly reject a double-fraction", () => {
      const invalid = convertHandler.getNum("1/2/3kg");
      assert.isNull(invalid);
    });
    test("should correctly default to 1 on empty number value", () => {
      const shouldBeOne = convertHandler.getNum("L");
      assert.strictEqual(shouldBeOne, 1);
    });
  });
});
