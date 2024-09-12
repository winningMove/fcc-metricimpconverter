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

  this.getUnit = function (input) {
    let result;

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };
}

module.exports = ConvertHandler;
