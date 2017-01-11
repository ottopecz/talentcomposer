module.exports = {
  "required": Symbol("required member"),
  compose(...args) {

    for (const arg of args) {
      this.typeCheck_(arg);
    }

    if (typeof args[0] === "function") {
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
      arg.toString().includes("class")
    ) {
      throw new TypeError("The parameter should not be a primitive or a class");
    }
  },
  composeSym_(...args) {
    return this.delegate_({}, ...args);
  },
  composeAsym_(...args) {

    const target = args.shift();

    return this.delegate_(target, ...args);
  },
  delegate_(target, ...sources) {

    for (let source of sources) {

      if (typeof source === "function") {

        source = {
          [`${source.name}`]: source
        };
      }

      this.copyover_(target, source);
    }

    return this.checkIntegrity_(target);
  },
  copyover_(target, source) {

    for (const prop of Reflect.ownKeys(source)) {

      if (source[prop].constructor === Object) {

        this.copyover_(target, source[prop]);
      }

      Reflect.defineProperty(target, prop, Reflect.getOwnPropertyDescriptor(source, prop));
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
