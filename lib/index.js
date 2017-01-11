const Talent = require("./Talent");
const {getIterableObjectEntries} = require("./util");

module.exports = {
  "required": Symbol("required member"),
  createTalent(record) {

    return new Talent(record);
  },
  compose(...args) {

    for (const arg of args) {

      if (
        typeof arg === "symbol" ||
        typeof arg === "string" ||
        typeof arg === "number" ||
        typeof arg === "boolean" ||
        typeof arg === "function" ||
        arg.toString().includes("class")
      ) {
        throw new TypeError("The parameter should not be a primitive, a function or a class");
      }
    }

    if (args[0] instanceof Talent) {
      throw new TypeError("The first argument has to be an instance or an object");
    }

    const target = args.shift();

    return this.delegate_(target, ...args);
  },
  delegate_(target, ...sources) {

    for (const source of sources) {

      this.recursiveCopy_(target, source);
    }

    return this.checkIntegrity_(target);
  },
  recursiveCopy_(target, source) {

    for (const [key, value] of getIterableObjectEntries(source)) {

      if (value instanceof Talent) {

        this.recursiveCopy_(target, value);
      }

      Reflect.defineProperty(target, key, Reflect.getOwnPropertyDescriptor(source, key));
    }
  },
  checkIntegrity_(composed) {

    for (const prop of Reflect.ownKeys(composed)) {

      if (composed[prop] === this.required) {

        throw new Error(`The member "${prop}" is required to be implemented`);
      }
    }

    return composed;
  }
};
