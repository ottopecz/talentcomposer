/**
 * Creates an iterable based on an object literal
 * @param {Object} obj The source object which own keys should be iterable
 * @returns {Object} The iterable with the own keys
 */
function getIterableObjectEntries(obj) {

  let index = 0;

  const propKeys = Reflect.ownKeys(obj);

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {

      if (index < propKeys.length) {

        const key = propKeys[index];

        index += 1;
        return {"value": [key, obj[key]]};
      }

      return {"done": true};
    }
  };
}

/**
 * Returns the object where the given own key exists and equal with value
 * @param {Array.<Object>} arr The source array of objects
 * @param {string} key The name of the own key to filter with
 * @param {*} value The value of the key to filter with
 * @returns {Object} The found object specified by the key value pair
 */
function findWhere(arr, key, value) {

  return arr.find(elem => {

    for (const [k, v] of getIterableObjectEntries(elem)) {

      return (k === key && v === value);
    }
  });
}

/**
 * Returns the object where the given own key exists
 * @param {Array.<Object>} arr The source array of objects
 * @param {string} key The name of the own key to filter with
 * @returns {Object} The found object specified by the name of the given own key
 */
function findWhereKey(arr, key) {

  return arr.find(elem => {

    for (const [k] of getIterableObjectEntries(elem)) {

      return (k === key);
    }
  });
}

module.exports.getIterableObjectEntries = getIterableObjectEntries;
module.exports.findWhere = findWhere;
module.exports.findWhereKey = findWhereKey;
