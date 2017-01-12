const Talent = require("./Talent");
const {getIterableObjectEntries, removeWhere, findWhereKey} = require("./util");

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
    const sources = args;
  },
  composeTalents(...sources) {

    let memberLog = [];

    for (const source of sources) {

      if (!(source instanceof Talent)) {
        throw new TypeError(`Parameter ${source} is not a talent`);
      }

      memberLog = this.processSource_(source, memberLog);
    }

    memberLog = this.processMemberLog_(memberLog);

    const record = {};

    for (const memberLogEntry of memberLog) {

      const key = Reflect.ownKeys(memberLogEntry)[0];
      const value = memberLogEntry[key];

      if (!value.length) {
        throw new Error(`The required member "${key}" remained unimplemented`);
      }

      memberLogEntry[key] = value[0];

      Reflect.defineProperty(record, key, Reflect.getOwnPropertyDescriptor(memberLogEntry, key));
    }

    return this.createTalent(record);
  },
  processMemberLog_(memberLog) {

    for (const memberLogEntry of memberLog) {

      const key = Reflect.ownKeys(memberLogEntry)[0];
      const value = memberLogEntry[key];

      memberLogEntry[key] = value.filter(elem => (elem !== this.required));
    }

    return memberLog;
  },
  processSource_(source, memberLog) {

    let mL = memberLog;

    for (const [key, value] of getIterableObjectEntries(source)) {

      if (value instanceof Talent) {

        mL = this.processSource_(value, mL);
      }

      const memberLogEntry = findWhereKey(mL, key);

      if (!memberLogEntry) {

        mL.push({[key]: [value]});
      } else {

        memberLogEntry[key].push(value);
      }
    }

    return mL;
  }
};
