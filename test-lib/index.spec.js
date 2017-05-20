const {expect} = require("code");
const Lab = require("lab");
const Composer = require("../lib/index");
const Talent = require("../lib/Talent");

const {describe, it} = exports.lab = Lab.script();

describe("The index", () => {

  it("should export \"Composer\"", done => {

    expect(Composer).to.be.an.object();
    done();
  });
});

describe("The \"Composer\" namespace", () => {

  it("should have a \"composeWithTalents\" public method", done => {

    expect(Composer).to.include("composeWithTalents");
    expect(Composer.composeWithTalents).to.be.a.function();
    done();
  });

  it("should have a \"composeTalents\" public method", done => {

    expect(Composer).to.include("composeTalents");
    expect(Composer.composeWithTalents).to.be.a.function();

    done();
  });
});

describe("The \"required\" property", () => {

  it("should be a unique symbol primitive", done => {

    expect(typeof Composer.required).to.equal("symbol");
    done();
  });

  it("should have a description of \"required member\"", done => {

    expect(Composer.required.toString()).to.include("required member");
    done();
  });
});

describe("The \"createTalent\" method", () => {

  it("should generate a talent defined by the given record", done => {

    const talent = Composer.createTalent({method() {}});

    expect(talent).to.include("method");
    expect(talent.method).to.be.a.function();
    expect(talent).to.be.an.instanceOf(Talent);
    done();
  });
});

describe("The \"composeTalents\" method", () => {

  it("should throw an type error if the one the arguments are not a talent", done => {

    const talent = {"it's not": "a talent"};

    expect(() => Composer.composeTalents(talent)).to.throw(TypeError, "Parameter [object Object] is not a talent");
    done();
  });

  it("should return a new talent which is composed using the source talents", done => {

    const talent1 = Composer.createTalent({method1() {}});
    const talent2 = Composer.createTalent({method2() {}});
    const composedTalent = Composer.composeTalents(talent1, talent2);

    expect(composedTalent).to.include({"method1": talent1.method1});
    expect(composedTalent).to.include({"method2": talent2.method2});
    done();
  });

  it("should resolve required values in a non linear way", done => {

    const talent1 = Composer.createTalent({method() {}});
    const talent2 = Composer.createTalent({"method": Composer.required});

    expect(Composer.composeTalents(talent1, talent2)).to.include({"method": talent1.method});
    done();
  });

  it("should preserve the unimplemented members", done => {

    const talent1 = Composer.createTalent({"method": Composer.required});
    const talent2 = Composer.createTalent({"method": Composer.required});
    const talent3 = Composer.createTalent({"method": Composer.required});
    const composedTalent = Composer.composeTalents(talent1, talent2, talent3);

    expect(composedTalent).to.include({"method": Composer.required});
    done();
  });

  it("should throw an error on unresolved conflicts", done => {

    const talent1 = Composer.createTalent({method() {}});
    const talent2 = Composer.createTalent({method() {}});

    expect(() => Composer.composeTalents(talent1, talent2)).to.throw(Error,
      "There is an unresolved conflict for property \"method\"");
    done();
  });

  it("should flatten talents", done => {

    const talent1 = Composer.createTalent({
      method1() {},
      "talent2": Composer.createTalent({
        method2() {},
        "talent3": Composer.createTalent({
          method3() {}
        })
      })
    });
    const composedTalent = Composer.composeTalents(talent1);

    expect(composedTalent).to.include({"method1": talent1.method1});
    expect(composedTalent).to.include({"method2": talent1.talent2.method2});
    expect(composedTalent).to.include({"method3": talent1.talent2.talent3.method3});
    done();
  });
});

describe("The \"composeWithTalents\" method", () => {

  describe("when the first parameter is not an object or an instance", () => {

    it("should throw an error", done => {

      expect(() => Composer.composeWithTalents(Composer.createTalent({})))
        .to.throw(TypeError, "The first argument has to be an instance or an object");
      expect(() => Composer.composeWithTalents(Symbol()))
        .to.throw(TypeError, "The first argument has to be an instance or an object");
      expect(() => Composer.composeWithTalents(true))
        .to.throw(TypeError, "The first argument has to be an instance or an object");
      expect(() => Composer.composeWithTalents("str"))
        .to.throw(TypeError, "The first argument has to be an instance or an object");
      expect(() => Composer.composeWithTalents(5))
        .to.throw(TypeError, "The first argument has to be an instance or an object");
      expect(() => Composer.composeWithTalents(function fn() {}))
        .to.throw(TypeError, "The first argument has to be an instance or an object");
      expect(() => Composer.composeWithTalents(class C {}))
        .to.throw(TypeError, "The first argument has to be an instance or an object");
      done();
    });
  });

  describe("when the first parameter is an object or an instance and the rests are talents", () => {

    it("should compose the instance with the talents", done => {

      class TestClass {
        instanceMethod() {}
      }

      let instance = new TestClass();
      const talent = Composer.createTalent({talentMethod() {}});

      instance = Composer.composeWithTalents(instance, talent);

      expect(Reflect.getPrototypeOf(instance)).to.include("instanceMethod");
      expect(instance.instanceMethod).to.be.a.function();
      expect(instance).to.include("talentMethod");
      expect(instance.talentMethod).to.be.a.function();
      done();
    });
  });

  describe("when the talent has a required member which the instance resolves", () => {

    it("should compose the instance with the talents", done => {

      class TestClass {
        method() {}
      }

      let instance = new TestClass();
      const talent = Composer.createTalent({"method": Composer.required});

      instance = Composer.composeWithTalents(instance, talent);

      expect(Reflect.getPrototypeOf(instance)).to.include("method");
      expect(instance.method).to.be.a.function();
      done();
    });
  });

  describe("when the instance has a member required which is unresolved by talent", () => {

    it("should throw an error", done => {

      class TestClass {
        constructor() {
          this.requiredMember = Composer.required;
        }
      }

      const instance = new TestClass();
      const talent = Composer.createTalent({}); // "requiredMember" undefined

      expect(() => Composer.composeWithTalents(instance, talent))
        .to.throw(Error, "Member \"requiredMember\" remained unimplemented");
      done();
    });
  });

  describe("when prototype of the instance has a member required which is unresolved by talent", () => {

    it("should throw an error", done => {

      class TestClass {
        get requiredMember() {
          return Composer.required;
        }
      }

      const instance = new TestClass();
      const talent = Composer.createTalent({}); // "requiredMember" undefined

      expect(() => Composer.composeWithTalents(instance, talent))
        .to.throw(Error, "Member \"requiredMember\" remained unimplemented");
      done();
    });
  });

  describe("when the instance and the talent has the same member required and the member is unresolved", () => {

    it("should throw an error", done => {

      class TestClass {
        constructor() {
          this.requiredMember = Composer.required;
        }
      }

      const instance = new TestClass();
      const talent = Composer.createTalent({"requiredMember": Composer.required}); // "requiredMember" defined but unresolved

      expect(() => Composer.composeWithTalents(instance, talent))
        .to.throw(Error, "Member \"requiredMember\" remained unimplemented");
      done();
    });
  });
});

describe("The \"alias\" method", () => {

  describe("when it's called with a non talent target parameter", () => {

    it("should throw a type error", done => {

      const nonTalent = {"it's not": "a talent"};

      expect(() => Composer.alias(nonTalent, "old", "new")).to.throw(TypeError, "The target has to be a talent");
      done();
    });
  });

  describe("when it's called with a non string old method name parameter", () => {

    it("should throw a type error", done => {

      const nonString = true;

      expect(() => Composer.alias(Composer.createTalent({old() {}}), nonString, "new"))
        .to.throw(TypeError, "The old method name has to be a string");
      done();
    });
  });

  describe("when it's called with a non string new method name parameter", () => {

    it("should throw a type error", done => {

      const nonString = true;

      expect(() => Composer.alias(Composer.createTalent({old() {}}), "old", nonString))
        .to.throw(TypeError, "The new method name has to be a string");
      done();
    });
  });

  describe("when it's called with the right parameters", () => {

    it("should rename the method of the target talent", done => {

      const renamed = Composer.alias(Composer.createTalent({old() {}}), "old", "new");

      expect(renamed).to.include("new");
      expect(renamed.new).to.be.a.function();
      expect(renamed).to.not.include("old");
      done();
    });
  });
});

describe("The \"exclude\" method", () => {

  describe("when it's called with a non talent target parameter", () => {

    it("should throw a type error", done => {

      const nonTalent = {"it's not": "a talent"};

      expect(() => Composer.exclude(nonTalent, "foo")).to.throw(TypeError, "The target has to be a talent");
      done();
    });
  });

  describe("when it's called with a non string old method name parameter", () => {

    it("should throw a type error", done => {

      const nonString = true;

      expect(() => Composer.exclude(Composer.createTalent({foo() {}}), nonString))
        .to.throw(TypeError, "The method name has to be a string");
      done();
    });
  });

  describe("when it's called with the right parameters", () => {

    it("should remove the method of the target talent", done => {

      const excluded = Composer.exclude(Composer.createTalent({foo() {}}), "foo");

      expect(excluded).to.not.include("foo");
      done();
    });
  });
});
