const {expect} = require("chai");
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

  describe("when any of the parameters is primitive or a class", () => {

    it("should throw an error", () => {

      expect(() => Composer.compose(Symbol())).to.throw(TypeError, "The parameter should not be a primitive or a class");
      expect(() => Composer.compose(true)).to.throw(TypeError, "The parameter should not be a primitive or a class");
      expect(() => Composer.compose("str")).to.throw(TypeError, "The parameter should not be a primitive or a class");
      expect(() => Composer.compose(5)).to.throw(TypeError, "The parameter should not be a primitive or a class");
      expect(() => Composer.compose(class C {})).to.throw(TypeError, "The parameter should not be a primitive or a class");
    });
  });

  describe("when the composition is asymmetric", () => {

    const instance = {[Symbol("This is an")]: "instance"};
    function talent() {}

    it("should should not throw an error", () => {

      expect(() => Composer.compose(instance, talent)).to.not.throw();
    });

    it("should return the instance if an instance is composed with talents", () => {

      const composed = Composer.compose(instance, talent);

      expect(composed).to.deep.equal(instance);
    });

    it("should compose the instance with the talent", () => {

      const composed = Composer.compose(instance, talent);

      expect(composed).to.have.a.property("talent").that.is.a.function;
    });
  });

  describe("when the composition is symmetric", () => {

    function talent1() {}
    function talent2() {}

    it("should should not throw an error", () => {

      expect(() => Composer.compose(talent1, talent2)).to.not.throw();
    });

    it("should return an new talent", () => {

      const composed = Composer.compose(talent1, talent2);

      expect(composed).to.not.equal(talent1);
      expect(composed).to.not.equal(talent2);
      expect(composed).to.be.have.a.property("talent1").that.is.a.function;
      expect(composed).to.be.have.a.property("talent2").that.is.a.function;
    });
  });

  describe.only("when talents are nested (already composed)", () => {

    const instance = {[Symbol("This is an")]: "instance"};
    const composedTalents1 = {
      talent1() {},
      "composedTalents2": {
        talent2() {},
        talent3() {}
      }
    };

    it("should flatten the composed object", () => {

      const composed = Composer.compose(instance, composedTalents1);

      expect(composed).to.be.have.a.property("talent1").that.is.a.function;
      expect(composed).to.be.have.a.property("talent2").that.is.a.function;
      expect(composed).to.be.have.a.property("talent3").that.is.a.function;
    });
  });
});
