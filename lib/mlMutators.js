const Talent = require("./Talent");
const {getIterableObjectEntries, findWhereKey} = require("./util");

exports.parseML = function parseML(memberLog, required) {

  const mL = memberLog;

  for (const mLEntry of mL) {

    const key = Reflect.ownKeys(mLEntry)[0];
    const value = mLEntry[key];

    mLEntry[key] = value.filter(elem => (elem !== required));
  }

  return mL;
};

exports.addSourceInfoToML = function addSourceInfoToML(memberLog, source) {

  let mL = memberLog;

  for (const [key, value] of getIterableObjectEntries(source)) {

    if (Talent.typeCheck(value)) {

      mL = addSourceInfoToML(mL, value);
    }

    const memberLogEntry = findWhereKey(mL, key);

    if (!memberLogEntry && !Talent.typeCheck(value)) {

      mL.push({[key]: [value]});
    } else if (!Talent.typeCheck(value)) {

      memberLogEntry[key].push(value);
    }
  }

  return mL;
};
