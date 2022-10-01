const assert = require("chai").assert;
const expect = require("chai").expect;
const email = require("../email");
const AWS = require("aws-sdk-mock");

let expectedParams;
let actualParams;

describe("Test Email", function () {
  before(function () {
    AWS.mock("SES", "sendTemplateEmail", function (params, callback) {
      actualParams = params;
      callback(null, "string");
    });
  });

  after(function () {
    AWS.restore();
  });

  it("Get the difference between two temperatures", function () {
    const templateData = {
      response: `<h1> Temperature: <\/h1> <p> Uganda: 28C <br> UK: 5C <br> Difference: 23C`,
    };
    const destination = {
      "ToAddresses": ["stuartkasekende1@gmail.com"],
    };

    expectedParams = {
      Source: "stuartkasekende1@gmail.com",
      Destination: destination,
      Template: "testtemplate",
      templateData: JSON.stringify(templateData),
    };
    email.sendCelebrationEmail(28.37, 5.13);
    assert.deepEqual(actualParams, expectedParams);
  });
});
