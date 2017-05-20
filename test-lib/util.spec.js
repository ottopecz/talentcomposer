const {expect} = require("code");
const Lab = require("lab");
const {findWhere, findWhereKey} = require("../lib/util");

const {describe, it} = exports.lab = Lab.script();

describe("The \"findWhere\" function", () => {

  it("should return an object element of the array where the given key value pair is present", done => {

    const arr = [{"foo": "bar"}, {"foo": "notBar"}, {"bar": "foo"}];

    expect(findWhere(arr, "foo", "bar")).equal({"foo": "bar"});
    done();
  });
});

describe("The \"findWhere\" function", () => {

  it("should return undefined if the given key value pair is not present in any of the objects", done => {

    const arr = [{"foo": "bar"}];

    expect(findWhere(arr, "bar", "foo")).to.be.undefined();
    done();
  });
});


describe("The \"findWhereKey\" function", () => {

  it("should return an object element of the array where the given key is present", done => {

    const arr = [{"foo": "bar"}, {"foo": "notBar"}, {"bar": "foo"}];

    expect(findWhereKey(arr, "foo")).equal({"foo": "bar"});
    done();
  });
});

describe("The \"findWhereKey\" function", () => {

  it("should return undefined if the given key is not present in any of the objects", done => {

    const arr = [{"foo": "bar"}];

    expect(findWhereKey(arr, "bar")).to.be.undefined();
    done();
  });
});
