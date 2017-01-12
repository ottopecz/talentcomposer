const {expect} = require("chai");
const {removeWhere, findWhere, findWhereKey} = require("../lib/util");

describe("The \"removeWhere\" function", () => {

  it("should return a new array where those objects are excluded where the given key value pair is present", () => {

    const arr = [{"foo": "bar"}, {"foo": "notBar"}, {"notFoo": "notBar"}, {"foo": "bar"}];

    expect(removeWhere(arr, "foo", "bar")).deep.equal([{"foo": "notBar"}, {"notFoo": "notBar"}]);
  });
});

describe("The \"findWhere\" function", () => {

  it("should return an object element of the array where the given key value pair is present", () => {

    const arr = [{"foo": "bar"}, {"foo": "notBar"}, {"bar": "foo"}];

    expect(findWhere(arr, "foo", "bar")).deep.equal({"foo": "bar"});
  });
});

describe("The \"findWhere\" function", () => {

  it("should return undefined if the given key value pair is not present in any of the objects", () => {

    const arr = [{"foo": "bar"}];

    expect(findWhere(arr, "bar", "foo")).to.be.undefined;
  });
});


describe("The \"findWhereKey\" function", () => {

  it("should return an object element of the array where the given key is present", () => {

    const arr = [{"foo": "bar"}, {"foo": "notBar"}, {"bar": "foo"}];

    expect(findWhereKey(arr, "foo")).deep.equal({"foo": "bar"});
  });
});

describe("The \"findWhereKey\" function", () => {

  it("should return undefined if the given key is not present in any of the objects", () => {

    const arr = [{"foo": "bar"}];

    expect(findWhereKey(arr, "bar")).to.be.undefined;
  });
});
