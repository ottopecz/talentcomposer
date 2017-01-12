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

function copyOwnProps(target, source) {

  for (const [key] of getIterableObjectEntries(source)) {

    Reflect.defineProperty(target, key, Reflect.getOwnPropertyDescriptor(source, key));
  }
}

function removeWhere(arr, key, value) {

  return arr.filter(elem => {

    let ret = true;

    for (const [k, v] of getIterableObjectEntries(elem)) {
      if (k === key && v === value) {
        ret = false;
        break;
      }
    }

    return ret;
  });
}

function findWhere(arr, key, value) {

  return arr.find(elem => {

    for (const [k, v] of getIterableObjectEntries(elem)) {

      return (k === key && v === value);
    }
  });
}

function findWhereKey(arr, key) {

  return arr.find(elem => {

    for (const [k] of getIterableObjectEntries(elem)) {

      return (k === key);
    }
  });
}

module.exports.getIterableObjectEntries = getIterableObjectEntries;
module.exports.copyOwnProps = copyOwnProps;
module.exports.removeWhere = removeWhere;
module.exports.findWhere = findWhere;
module.exports.findWhereKey = findWhereKey;
