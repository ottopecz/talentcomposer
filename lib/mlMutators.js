const clone = require("lodash.clone");
const Talent = require("./Talent");
const {getIterableObjectEntries, findWhereKey} = require("./util");

/**
 * Removes the required members of the member log
 * @param {Array.<Object>} memberLog The array of the members. The entries are objects with one own key
 * @param {Symbol} required The required marker
 * @returns {Array.<Object>} The parsed member log
 */
function parseML(memberLog, required) {

  return memberLog.map(member => {

    const cloned = clone(member);
    const key = Reflect.ownKeys(cloned)[0];
    const value = cloned[key];

    cloned[key] = value.filter(elem => (elem !== required));

    return cloned;
  });
}

/**
 * Adds new entry to the member log or modifies an existing one
 * @param {Array.<Object>} memberLog The array of the members. The entries are objects with one own key
 * @param {Talent} source The talent which info needs to be added. (Might be nested)
 * @returns {Array.<Object>} The modified member log
 */
function addSourceInfoToML(memberLog, source) {

  let cloned = memberLog.slice();

  for (const [key, value] of getIterableObjectEntries(source)) {

    if (Talent.typeCheck(value)) {

      cloned = addSourceInfoToML(cloned, value);
    }

    const foundAndCloned = clone(findWhereKey(cloned, key));

    if (!foundAndCloned && !Talent.typeCheck(value)) {

      cloned.push({[key]: [value]});
    } else if (!Talent.typeCheck(value)) {

      foundAndCloned[key].push(value);
    }
  }

  return cloned;
}

module.exports.parseML = parseML;
module.exports.addSourceInfoToML = addSourceInfoToML;
