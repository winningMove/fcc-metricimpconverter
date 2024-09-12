"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route("/api/convert", (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    if (initNum === null || initUnit === null) {
      const invalidMessage = `${initNum === null ? "invalid number" : ""}${
        initNum === null && initUnit === null ? " and " : ""
      }${initUnit === null ? "invalid unit" : ""}`;
      return res.json({ string: invalidMessage });
    }
    const returnNum = convertHandler.convert(initNum);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const message = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: message,
    });
  });
};
