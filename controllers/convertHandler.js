function ConvertHandler() {
  // helper to split (optional) value and unit, null if no match
  function splitInput(input) {
    const splitResult = input.match(/^([\d./]*)([a-zA-Z]+)$/);
    if (splitResult) {
      return {
        value: splitResult[1],
        unit: splitResult[2],
      };
    }
    return null;
  }
  // null if multiple fractions or invalid number
  this.getNum = function (input) {
    const value = splitInput(input)?.value;

    if (value === "") return 1;

    const splitFractional = value.split("/");
    if (splitFractional.length > 2) return null;

    let result;
    if (splitFractional.length === 1) {
      result = parseFloat(value);
    } else {
      result = parseFloat(splitFractional[0]) / parseFloat(splitFractional[1]);
    }

    return !isNaN(result) ? result : null;
  };
  // null if invalid unit
  this.getUnit = function (input) {
    const unit = splitInput(input)?.unit;
    const unitRegex = /^(?:kg|km|lbs|mi|l|gal)$/i;

    if (!unitRegex.test(unit)) return null;
    if (/l/i.test(unit)) {
      return "L";
    } else {
      return unit.toLowerCase();
    }
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      kg: "lbs",
      lbs: "kg",
      km: "mi",
      mi: "km",
      L: "gal",
      gal: "L",
    };

    return unitMap[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const spelledOutMap = {
      kg: "kilograms",
      lbs: "pounds",
      km: "kilometers",
      mi: "miles",
      L: "liters",
      gal: "gallons",
    };

    return spelledOutMap[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case "gal":
        return initNum * galToL;
      case "L":
        return initNum / galToL;
      case "lbs":
        return initNum * lbsToKg;
      case "kg":
        return initNum / lbsToKg;
      case "mi":
        return initNum * miToKm;
      case "km":
        return initNum / miToKm;
      default:
        return null;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };
}

module.exports = ConvertHandler;
