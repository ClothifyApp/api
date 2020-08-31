const assert = require("assert");
const {secondsSinceEpoch}  = require("../utils/dates");

describe("utils - secondsSinceEpoch", function () {

    it("when date is passed as argument should return its epoch", function () {
        

        const result = secondsSinceEpoch('2020-08-22T05:53:35.378Z');
        const expected = 1598075615;

        assert.strictEqual(result, expected);
    });


});