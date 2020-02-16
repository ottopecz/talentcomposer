const {expect} = require("@hapi/code");
const Lab = require("@hapi/lab");
const {findWhere, findWhereKey} = require("../lib/util");

const {describe, it} = exports.lab = Lab.script();

describe("The \"findWhere\" function", () => {

  it("should return an object element of the array where the given key value pair is present", () => {

    const arr = [{"foo": "bar"}, {"oof": "rab", "bar": "foo"}];

    expect(findWhere(arr, "bar", "foo")).equal({"oof": "rab", "bar": "foo"});
  });

  it("should return undefined if the given key value pair is not present in any of the objects", () => {

    const arr = [{"oof": "rab"}, {"foo": "bar"}];

    expect(findWhere(arr, "bar", "foo")).to.be.undefined();
  });

  it("should return undefined if only the key is present in a record and the value is not", () => {

    const arr = [{"oof": "rab"}, {"bar": "bar"}];

    expect(findWhere(arr, "bar", "foo")).to.be.undefined();
  });
});

describe("The \"findWhereKey\" function", () => {

  it("should return an object element of the array where the given key is present", () => {

    const arr = [{"foo": "bar"}, {"oof": "rab", "bar": "foo"}];

    expect(findWhereKey(arr, "bar")).equal({"oof": "rab", "bar": "foo"});
  });

  it("should return undefined if the given key is not present in any of the objects", () => {

    const arr = [{"foo": "bar"}, {"oof": "rab", "bar": "foo"}];

    expect(findWhereKey(arr, "rab")).to.be.undefined();
  });
});
