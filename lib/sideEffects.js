const Talent = require("./Talent");
const {getIterableObjectEntries, findWhereKey} = require("./util");

exports.parseMemberLog = function parseMemberLog(memberLog, required) {

  for (const memberLogEntry of memberLog) {

    const key = Reflect.ownKeys(memberLogEntry)[0];
    const value = memberLogEntry[key];

    memberLogEntry[key] = value.filter(elem => (elem !== required));
  }

  return memberLog;
};

exports.addSourceInfoToML = function addSourceInfoToML(source, memberLog) {

  let mL = memberLog;

  for (const [key, value] of getIterableObjectEntries(source)) {

    if (Talent.typeCheck(value)) {

      mL = addSourceInfoToML(value, mL);
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
