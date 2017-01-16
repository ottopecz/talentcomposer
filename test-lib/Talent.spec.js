const {expect} = require("chai");
const Talent = require("../lib/Talent");

describe("The Talent class", () => {

  describe("when it's instantiated with a record", () => {

    const record = {"foo": "bar"};
    const talent = new Talent(record);

    it("it should create the record entries on the instance", () => {

      expect(talent).to.have.a.property("foo", "bar");

      const expectedDesc = Reflect.getOwnPropertyDescriptor(record, "foo");
      const actualDesc = Reflect.getOwnPropertyDescriptor(talent, "foo");

      expect(expectedDesc).to.deep.equal(actualDesc);
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
      expect(newTalent).to.have.a.property("foo", "bar");
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
      expect(newTalent).to.not.have.a.property("foo");
    });
  });
});
