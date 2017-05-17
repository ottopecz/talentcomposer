const Talent = require("./Talent");
const {getIterableObjectEntries, findWhereKey} = require("./util");

/**
 * Removes the required members of the meber log
 * @param {Array.<Object>} memberLog The array of the members. The entries are objects with one own key
 * @param {Symbol} required The rquired marker
 * @returns {Array.<Object>} The parsed member log
 */
function parseML(memberLog, required) {

  const mL = memberLog;

  for (const mLEntry of mL) {

    const key = Reflect.ownKeys(mLEntry)[0];
    const value = mLEntry[key];

    mLEntry[key] = value.filter(elem => (elem !== required));
  }

  return mL;
}

/**
 * Adds new entry to the member log or modifies an existing one
 * @param {Array.<Object>} memberLog The array of the members. The entries are objects with one own key
 * @param {Talent} source The talent which info needs to be added. (Might be nested)
 * @returns {Array.<Object>} The modified member log
 */
function addSourceInfoToML(memberLog, source) {

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
}

module.exports.parseML = parseML;
module.exports.addSourceInfoToML = addSourceInfoToML;
