module.exports = class Talent {

  constructor(talentRecord) {

    if (!talentRecord) {
      throw new TypeError("The parameter of the talent constructor is missing");
    }

    if (talentRecord.constructor !== Object) {
      throw new TypeError("The parameter of the talent constructor has to be an object");
    }
  }
};
