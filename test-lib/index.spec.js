const {expect} = require("chai");
const Talent = require("../lib/Talent");
const Composer = require("../lib/index");

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

describe("The \"compose\" method", () => {

  describe("when any of the parameters is primitive", () => {

    it("should throw an error", () => {

      expect(() => Composer.compose(function fn() {})).to.throw(TypeError, "The parameter should not be a primitive or a function");
      expect(() => Composer.compose(Symbol())).to.throw(TypeError, "The parameter should not be a primitive or a function");
      expect(() => Composer.compose(true)).to.throw(TypeError, "The parameter should not be a primitive or a function");
      expect(() => Composer.compose("str")).to.throw(TypeError, "The parameter should not be a primitive or a function");
      expect(() => Composer.compose(5)).to.throw(TypeError, "The parameter should not be a primitive or a function");
    });
  });

  describe("when any of the parameters, but the first, is not a talent", () => {

    it("should throw an error", () => {

      expect(() => Composer.compose({}, {})).to.throw(TypeError, "Every parameter should be a talent but the first one");
    });
  });

  describe("when the composition is asymmetric", () => {

    const instance = {[Symbol("This is an")]: "instance"};
    let talent = new Talent();

    it("should should not throw an error", () => {

      expect(() => Composer.compose(instance, talent)).to.not.throw();
    });

    it("should return the instance if an instance is composed with talents", () => {

      const composed = Composer.compose(instance, talent);

      expect(composed).to.deep.equal(instance);
    });

    it("should compose the instance with the talent", () => {

      talent = new Talent({
        talentMethod() {}
      });

      const composed = Composer.compose(instance, talent);

      expect(composed).to.have.a.property("talentMethod").that.is.a.function;
    });
  });

  describe("when the composition is symmetric", () => {

    const talent1 = new Talent();
    const talent2 = new Talent();

    it("should should not throw an error", () => {

      expect(() => Composer.compose(talent1, talent2)).to.not.throw();
    });

    it("should return an new talent if talents are composed", () => {

      const composed = Composer.compose(talent1, talent2);

      expect(composed).to.not.equal(talent1);
      expect(composed).to.not.equal(talent2);
      expect(composed).to.be.an.instanceOf(Talent);
    });
  });
});
