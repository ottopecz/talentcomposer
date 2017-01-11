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

module.exports.getIterableObjectEntries = getIterableObjectEntries;
module.exports.copyOwnProps = copyOwnProps;
