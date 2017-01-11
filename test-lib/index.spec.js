const {expect} = require("chai");
const Composer = require("../lib/index");
const Talent = require("../lib/Talent");

describe("The index", () => {

  it("should export \"Composer\"", () => {
    expect(Composer).be.an.object;
  });
});

describe("The \"Composer\" namespace", () => {

  it("should have a \"compose\" method", () => {

    expect(Composer).to.have.a.property("compose").that.is.a.function;
  });
});

describe("The \"required\" property", () => {

  it("should be a unique symbol primitive", () => {

    expect(typeof Composer.required).to.equal("symbol");
  });

  it("should have a description of \"required member\"", () => {

    expect(Composer.required.toString()).to.include("required member");
  });
});

describe("The \"createTalent\" method", () => {

  it("should generate a talent defined by the given record", () => {

    const talent = Composer.createTalent({method() {}});

    expect(talent).to.have.a.property("method").that.is.a.function;
    expect(talent).to.be.an.instanceOf(Talent);
  });
});

describe("The \"compose\" method", () => {

  describe("when any of the parameters is primitive or a class", () => {

    it("should throw an error", () => {

      expect(() => Composer.compose(Symbol())).to.throw(TypeError, "The parameter should not be a primitive, a function or a class");
      expect(() => Composer.compose(true)).to.throw(TypeError, "The parameter should not be a primitive, a function or a class");
      expect(() => Composer.compose("str")).to.throw(TypeError, "The parameter should not be a primitive, a function or a class");
      expect(() => Composer.compose(5)).to.throw(TypeError, "The parameter should not be a primitive, a function or a class");
      expect(() => Composer.compose(function fn() {})).to.throw(TypeError, "The parameter should not be a primitive, a function or a class");
      expect(() => Composer.compose(class C {})).to.throw(TypeError, "The parameter should not be a primitive, a function or a class");
    });
  });

  describe("when the first parameter is a talent", () => {

    it("should throw an error", () => {

      expect(() => Composer.compose(Composer.createTalent({method() {}}))).to.throw(TypeError, "The first argument has to be an instance or an object");
    });
  });

  describe("when it's called with an instance and at least one talent", () => {

    const instance = {[Symbol("This is an")]: "instance"};

    it("should return the instance itself", () => {

      const talent = Composer.createTalent({});
      const composed = Composer.compose(instance, talent);

      expect(composed).to.deep.equal(instance);
    });

    it("should compose the instance with the talent", () => {

      const talent = Composer.createTalent({method() {}});
      const composed = Composer.compose(instance, talent);

      expect(composed).to.have.a.property("method").that.is.a.function;
    });
  });

  describe.only("when talents are nested", () => {

    const instance = {[Symbol("This is an")]: "instance"};
    const talent1 = Composer.createTalent({
      method1() {},
      "talent2": Composer.createTalent({method2() {}})
    });

    it("should flatten the composed object", () => {

      const composed = Composer.compose(instance, talent1);

      expect(composed).to.be.have.a.property("method1").that.is.a.function;
      expect(composed).to.be.have.a.property("method2").that.is.a.function;
    });
  });

  describe("when a required member was not composed with (simple case)", () => {
    const instance = {"required": Composer.required};

    function notTheRequired() {}

    it("should throw an error", () => {

      expect(() => Composer.compose(instance, notTheRequired)).to.throw(Error, "The member \"required\" is required to be implemented");
    });
  });

  describe("when a required member was composed with (simple case)", () => {

    const instance = {"required": Composer.required};

    function required() {}

    it("should throw an error", () => {

      expect(() => Composer.compose(instance, required)).to.not.throw();
    });
  });

  describe("when a required member was not composed with (nested case)", () => {

    const instance = {"required": Composer.required};
    const composedTalents = {notTheRequired() {}, foo() {}};

    it("should throw an error", () => {

      expect(() => Composer.compose(instance, composedTalents)).to.throw(Error, "The member \"required\" is required to be implemented");
    });
  });

  describe("when a required member was composed with (nested case)", () => {

    const instance = {"required": Composer.required};
    const composedTalents = {required() {}, foo() {}};

    it("should throw an error", () => {

      expect(() => Composer.compose(instance, composedTalents)).to.not.throw();
    });
  });

  describe("when a required member was composed with but the member is required later too (non linearity)", () => {

    const instance = {"required": Composer.required};
    const composedTalents1 = {required() {}, foo() {}};
    const composedTalents2 = {"required": Composer.required, foo() {}};

    it("should throw an error", () => {

      expect(() => Composer.compose(instance, composedTalents1, composedTalents2)).to.not.throw();
    });
  });
});
