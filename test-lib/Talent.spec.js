const {expect} = require("code");
const Lab = require("lab");
const Talent = require("../lib/Talent");

const {describe, it} = exports.lab = Lab.script();

describe("The Talent class", () => {

  describe("when it's instantiated with a record", () => {

    const record = {"foo": "bar"};
    const talent = new Talent(record);

    it("it should create the record entries on the instance", () => {

      expect(talent).to.include({"foo": "bar"});

      const expectedDesc = Reflect.getOwnPropertyDescriptor(record, "foo");
      const actualDesc = Reflect.getOwnPropertyDescriptor(talent, "foo");

      expect(expectedDesc).to.equal(actualDesc);
    });
  });

  describe("when it's instantiated with a record which has a symbol property", () => {

    const sym = Symbol("a symbol property");
    const record = {sym};
    const talent = new Talent(record);

    it("it should create the record entries on the instance", () => {

      expect(talent).to.include({sym});

      const expectedDesc = Reflect.getOwnPropertyDescriptor(record, "sym");
      const actualDesc = Reflect.getOwnPropertyDescriptor(talent, "sym");

      expect(expectedDesc).to.equal(actualDesc);
    });
  });

  describe("when it's instantiated with a talent which has a required property", () => {

    const record = {
      "foo": "bar",
      "req": Talent.required
    };
    const talent1 = new Talent(record);
    const talent2 = new Talent(talent1);

    it("it should copy the talent", () => {

      expect(talent2).to.include({"foo": "bar"});

      const expectedDesc = Reflect.getOwnPropertyDescriptor(record, "foo");
      const actualDesc = Reflect.getOwnPropertyDescriptor(talent2, "foo");

      expect(expectedDesc).to.equal(actualDesc);
      expect(talent2.req).to.equal(talent1.req);
      expect(talent2.req).to.equal(record.req);
    });
  });

  describe("when it's instantiated with a talent which has a plain symbol property", () => {

    const sym = Symbol("a symbol property");
    const record = {sym};
    const talent1 = new Talent(record);
    const talent2 = new Talent(talent1);

    it("it should copy the talent", () => {

      expect(talent2).to.include({sym});

      const expectedDesc = Reflect.getOwnPropertyDescriptor(record, "sym");
      const actualDesc = Reflect.getOwnPropertyDescriptor(talent2, "sym");

      expect(expectedDesc).to.equal(actualDesc);
    });
  });
});

describe("The \"addProperty\" static method of the Talent class", () => {

  describe("when it's executed with a talent instance and new key value pair", () => {

    const talent = new Talent({});
    const keyValue = {"foo": "bar"};

    it("it should return with a new talent which is the copy of the old one plus the new property", () => {

      const newTalent = Talent.addProperty(talent, keyValue);

      expect(newTalent).to.be.an.instanceOf(Talent);
      expect(newTalent).to.include({"foo": "bar"});
    });
  });
});

describe("The \"removeProperty\" static method of the Talent class", () => {

  describe("when it's executed with a talent instance, a property name and a property descriptor", () => {

    const talent = new Talent({"foo": "bar"});
    const key = "foo";

    it("it should return with a new talent which is the copy of the old one minus the property", () => {

      const newTalent = Talent.removeProperty(talent, key);

      expect(newTalent).to.be.an.instanceOf(Talent);
      expect(newTalent).to.not.include("foo");
    });
  });
});

describe("The \"typeCheck\" static method of the Talent class", () => {

  describe("when it's executed with a talent instance", () => {

    const talent = new Talent({"foo": "bar"});

    it("it should return true", () => {

      expect(Talent.typeCheck(talent)).to.be.true();
    });
  });

  describe("when it's executed with a non-talent", () => {

    const nonTalent = {"foo": "bar"};

    it("it should return false", () => {

      expect(Talent.typeCheck(nonTalent)).to.be.false();
    });
  });
});
