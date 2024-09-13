const { assert } = require("chai");
const ConvertHandler = require("../controllers/convertHandler.js");

const convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("ConvertHandler getNum()", function () {
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
    test("should correctly read a fractional input with a decimal", () => {
      const frWithDec = convertHandler.getNum("2.2/1.1km");
      assert.isNumber(frWithDec);
      assert.strictEqual(frWithDec, 2);
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
  suite("ConvertHandler getUnit()", function () {
    test("should correctly read each valid input unit", () => {
      const validInputs = ["gaL", "l", "Kg", "mI", "KM", "lbs"];
      const readInputs = validInputs.map(convertHandler.getUnit);
      const correctOutput = ["gal", "L", "kg", "mi", "km", "lbs"];
      assert.deepStrictEqual(readInputs, correctOutput);
    });
    test("should correctly reject invalid input unit", () => {
      const validInputs = ["beep", "doL", "siKG", "duLL", "123zz", "!!-"];
      const readInputs = validInputs.map(convertHandler.getUnit);
      const correctOutput = Array(6).fill(null);
      assert.deepStrictEqual(readInputs, correctOutput);
    });
  });
  suite("ConvertHandler getReturnUnit()", function () {
    test("should return the correct return unit for each valid input unit", () => {
      const validInputs = ["gal", "L", "kg", "mi", "km", "lbs"];
      const readInputs = validInputs.map(convertHandler.getReturnUnit);
      const correctOutput = ["L", "gal", "lbs", "km", "mi", "kg"];
      assert.deepStrictEqual(readInputs, correctOutput);
    });
  });
  suite("ConvertHandler spellOutUnit()", function () {
    test("should correctly return the spelled-out string unit for each valid input unit", () => {
      const validInputs = ["gal", "L", "kg", "mi", "km", "lbs"];
      const readInputs = validInputs.map(convertHandler.spellOutUnit);
      const correctOutput = [
        "gallons",
        "liters",
        "kilograms",
        "miles",
        "kilometers",
        "pounds",
      ];
      assert.deepStrictEqual(readInputs, correctOutput);
    });
  });
  suite("ConvertHandler convert()", function () {
    test("should correctly convert gal to L", () => {
      const converted = convertHandler.convert(56, "gal");
      assert.strictEqual(converted, +(56 * convertHandler.galToL).toFixed(5));
    });
    test("should correctly convert L to gal", () => {
      const converted = convertHandler.convert(56, "L");
      assert.strictEqual(converted, +(56 / convertHandler.galToL).toFixed(5));
    });
    test("should correctly convert mi to km", () => {
      const converted = convertHandler.convert(56, "mi");
      assert.strictEqual(converted, +(56 * convertHandler.miToKm).toFixed(5));
    });
    test("should correctly convert km to mi", () => {
      const converted = convertHandler.convert(56, "km");
      assert.strictEqual(converted, +(56 / convertHandler.miToKm).toFixed(5));
    });
    test("should correctly convert lbs to kg", () => {
      const converted = convertHandler.convert(56, "lbs");
      assert.strictEqual(converted, +(56 * convertHandler.lbsToKg).toFixed(5));
    });
    test("should correctly convert kg to lbs", () => {
      const converted = convertHandler.convert(56, "kg");
      assert.strictEqual(converted, +(56 / convertHandler.lbsToKg).toFixed(5));
    });
  });
});
