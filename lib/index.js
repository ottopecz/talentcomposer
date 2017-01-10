const Talent = require("./Talent");

module.exports = {
  compose(...args) {

    let counter = 0;

    for (const arg of args) {

      this.typeCheck_(arg);

      if (counter !== 0 && !(arg instanceof Talent)) {
        throw new TypeError("Every parameter should be a talent but the first one");
      }
      counter += 1;
    }

    if (args[0] instanceof Talent) {
      return this.composeSym_(...args);
    }

    return this.composeAsym_(...args);
  },
  typeCheck_(arg) {

    if (
      typeof arg === "symbol" ||
      typeof arg === "string" ||
      typeof arg === "number" ||
      typeof arg === "boolean" ||
      typeof arg === "function"
    ) {
      throw new TypeError("The parameter should not be a primitive or a function");
    }
  },
  composeSym_(...args) {
    return new Talent();
  },
  composeAsym_(...args) {
    return args[0];
  }
};
