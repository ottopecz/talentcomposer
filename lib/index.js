const Talent = require("./Talent");
const {getIterableObjectEntries, findWhereKey} = require("./util");

module.exports = {
  "required": Symbol("required member"),
  createTalent(record) {

    return new Talent(record);
  },
  composeWithTalents(target, ...sources) {

    if (
      target instanceof Talent ||
      typeof target === "symbol" ||
      typeof target === "string" ||
      typeof target === "number" ||
      typeof target === "boolean" ||
      typeof target === "function"
    ) {
      throw new TypeError("The first argument has to be an instance or an object");
    }

    const source = this.composeTalents(...sources);
    const requiredsOnSource = [];

    for (const [key, value] of getIterableObjectEntries(source)) {

      if (value === this.required) {
        requiredsOnSource.push(key);
      } else {
        Reflect.defineProperty(target, key, Reflect.getOwnPropertyDescriptor(source, key));
      }
    }

    for (const requiredOnSource of requiredsOnSource) {

      if (!target[requiredOnSource] || target[requiredOnSource] === this.required) {

        throw new Error(`Member "${requiredOnSource}" remained unimplemented`);
      }
    }

    for (const [key, value] of getIterableObjectEntries(target)) {

      if (value === this.required) {

        throw new Error(`Member "${key}" remained unimplemented`);
      }
    }

    return target;
  },
  composeTalents(...talents) {

    for (const source of talents) {

      if (!(source instanceof Talent)) {
        throw new TypeError(`Parameter ${source} is not a talent`);
      }
    }

    let memberLog = [];

    for (const source of talents) {

      memberLog = this.addSourceInfoToML_(source, memberLog);
    }

    memberLog = this.parseMemberLog_(memberLog);

    const record = {};

    for (const memberLogEntry of memberLog) {

      const key = Reflect.ownKeys(memberLogEntry)[0];
      const value = memberLogEntry[key];

      switch (value.length) {
        case 0:
          memberLogEntry[key] = this.required;
          Reflect.defineProperty(record, key, Reflect.getOwnPropertyDescriptor(memberLogEntry, key));
          break;
        case 1:
          memberLogEntry[key] = value[0];
          Reflect.defineProperty(record, key, Reflect.getOwnPropertyDescriptor(memberLogEntry, key));
          break;
        default:
          throw new Error(`There is an unresolved conflict for property "${key}"`);
      }
    }

    return this.createTalent(record);
  },
  alias(talent, oldName, newName) {

    if (!(talent instanceof Talent)) {

      throw new TypeError("The target has to be a talent");
    }

    if (typeof oldName !== "string") {

      throw new TypeError("The old method name has to be a string");
    }

    if (typeof newName !== "string") {

      throw new TypeError("The new method name has to be a string");
    }

    const added = Talent
      .addProperty(talent, {[newName]: talent[oldName]});

    return Talent
      .removeProperty(added, oldName);
  },
  exclude(talent, name) {

    if (!(talent instanceof Talent)) {

      throw new TypeError("The target has to be a talent");
    }

    if (typeof name !== "string") {

      throw new TypeError("The method name has to be a string");
    }

    return Talent.removeProperty(talent, name);
  },
  parseMemberLog_(memberLog) {

    for (const memberLogEntry of memberLog) {

      const key = Reflect.ownKeys(memberLogEntry)[0];
      const value = memberLogEntry[key];

      memberLogEntry[key] = value.filter(elem => (elem !== this.required));
    }

    return memberLog;
  },
  addSourceInfoToML_(source, memberLog) {

    let mL = memberLog;

    for (const [key, value] of getIterableObjectEntries(source)) {

      if (value instanceof Talent) {

        mL = this.addSourceInfoToML_(value, mL);
      }

      const memberLogEntry = findWhereKey(mL, key);

      if (!memberLogEntry && !(value instanceof Talent)) {

        mL.push({[key]: [value]});
      } else if (!(value instanceof Talent)) {

        memberLogEntry[key].push(value);
      }
    }

    return mL;
  }
};
