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

  this.galToL = 3.78541;
  this.lbsToKg = 0.453592;
  this.miToKm = 1.60934;

  this.convert = function (initNum, initUnit) {
    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * this.galToL;
        break;
      case "L":
        result = initNum / this.galToL;
        break;
      case "lbs":
        result = initNum * this.lbsToKg;
        break;
      case "kg":
        result = initNum / this.lbsToKg;
        break;
      case "mi":
        result = initNum * this.miToKm;
        break;
      case "km":
        result = initNum / this.miToKm;
        break;
      default:
        return null;
    }
    result = +result.toFixed(5);
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const [spelledOutInit, spelledOutReturn] = [initUnit, returnUnit].map(
      this.spellOutUnit
    );
    const result = `${initNum} ${spelledOutInit} converts to ${returnNum} ${spelledOutReturn}`;
    return result;
  };
}

module.exports = ConvertHandler;
