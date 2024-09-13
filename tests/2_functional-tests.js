const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");
const ConvertHandler = require("../controllers/convertHandler");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  let requester, convertHandler;
  suiteSetup(function startServer(done) {
    requester = chai.request(server).keepOpen();
    convertHandler = new ConvertHandler();
    done();
  });
  suiteTeardown(function closeServer(done) {
    requester.close();
    convertHandler = null;
    done();
  });

  test("get request should convert a valid input such as 10L", (done) => {
    requester
      .get("/api/convert")
      .query({ input: "10L" })
      .end((err, res) => {
        assert.isNull(err);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.returnNum, convertHandler.convert(10, "L"));
        assert.strictEqual(
          res.body.returnUnit,
          convertHandler.getReturnUnit("L")
        );
        done();
      });
  });

  test("get request should reject an invalid input such as 32g", (done) => {
    requester
      .get("/api/convert")
      .query({ input: "32g" })
      .end((err, res) => {
        assert.isNull(err);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.string, "invalid unit");
        done();
      });
  });

  test("get request should reject an invalid number such as 3/7.2/4kg", (done) => {
    requester
      .get("/api/convert")
      .query({ input: "3/7.2/4kg" })
      .end((err, res) => {
        assert.isNull(err);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.string, "invalid number");
        done();
      });
  });

  test("get request should reject an invalid number and unit such as 3/7.2/4kilomegagram", (done) => {
    requester
      .get("/api/convert")
      .query({ input: "3/7.2/4kilomegagram" })
      .end((err, res) => {
        assert.isNull(err);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.string, "invalid number and unit");
        done();
      });
  });

  test("get request should convert a valid input with no number such as kg", (done) => {
    requester
      .get("/api/convert")
      .query({ input: "kg" })
      .end((err, res) => {
        assert.isNull(err);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.returnNum, convertHandler.convert(1, "kg"));
        assert.strictEqual(
          res.body.returnUnit,
          convertHandler.getReturnUnit("kg")
        );
        done();
      });
  });
});
