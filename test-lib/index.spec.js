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

describe.only("The \"composeTalents\" method", () => {

  it("should throw an type error if the one the arguments are not a talent", () => {

    const talent = {"it's not": "a talent"};

    expect(() => Composer.composeTalents(talent)).to.throw(TypeError, "Parameter [object Object] is not a talent");
  });

  it("should return a new talent which is composed using the source talents", () => {

    const talent1 = Composer.createTalent({method1() {}});
    const talent2 = Composer.createTalent({method2() {}});
    const composedTalent = Composer.composeTalents(talent1, talent2);

    expect(composedTalent).to.have.a.property("method1", talent1.method1);
    expect(composedTalent).to.have.a.property("method2", talent2.method2);
  });

  it("should resolve required values in a non linear way", () => {

    const talent1 = Composer.createTalent({method() {}});
    const talent2 = Composer.createTalent({"method": Composer.required});

    expect(Composer.composeTalents(talent1, talent2)).to.have.a.property("method", talent1.method);
  });

  it("should throw an error if a required member remains unimplemented", () => {

    const talent1 = Composer.createTalent({"method": Composer.required});
    const talent2 = Composer.createTalent({"method": Composer.required});

    expect(() => Composer.composeTalents(talent1, talent2).to.throw("Error", `The required member "method" remained unimplemented`));
  });

  it("should flatten talents", () => {

    const talent1 = Composer.createTalent({
      method1() {},
      "talent2": Composer.createTalent({method2() {}})
    });
    const composedTalent = Composer.composeTalents(talent1);

    expect(composedTalent).to.have.a.property("method1", talent1.method1);
    expect(composedTalent).to.have.a.property("method2", talent1.talent2.method2);
  });
});

// describe("The \"compose\" method", () => {
//
//   describe("when any of the parameters is primitive or a class", () => {
//
//     it("should throw an error", () => {
//
//       expect(() => Composer.compose(Symbol())).to.throw(TypeError, "The parameter should not be a primitive, a function or a class");
//       expect(() => Composer.compose(true)).to.throw(TypeError, "The parameter should not be a primitive, a function or a class");
//       expect(() => Composer.compose("str")).to.throw(TypeError, "The parameter should not be a primitive, a function or a class");
//       expect(() => Composer.compose(5)).to.throw(TypeError, "The parameter should not be a primitive, a function or a class");
//       expect(() => Composer.compose(function fn() {})).to.throw(TypeError, "The parameter should not be a primitive, a function or a class");
//       expect(() => Composer.compose(class C {})).to.throw(TypeError, "The parameter should not be a primitive, a function or a class");
//     });
//   });
// });
