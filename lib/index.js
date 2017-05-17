const Talent = require("./Talent");
const {getIterableObjectEntries} = require("./util");
const {parseML, addSourceInfoToML} = require("./mlMutators");

module.exports = {

  /**
   * The "required marker"
   * @type {Symbol}
   */
  "required": Talent.required,

  /**
   * Creates a new talent
   * @param {Object} record The source record of a talent. Usually an object literal.
   * @returns {Talent} The created talent
   */
  createTalent(record) {

    return new Talent(record);
  },

  /**
   * Composes an instance of a class or an object literal with talents
   * @param {Object} target The target of the asymmetric composition
   * @param {...Talent} sources The list of the talents
   * @returns {*} The target with the composed talents
   */
  composeWithTalents(target, ...sources) {

    const trgt = target;

    if (
      Talent.typeCheck(trgt) ||
      typeof trgt === "symbol" ||
      typeof trgt === "string" ||
      typeof trgt === "number" ||
      typeof trgt === "boolean" ||
      typeof trgt === "function"
    ) {
      throw new TypeError("The first argument has to be an instance or an object");
    }

    const source = this.composeTalents(...sources);
    const requiredsOnSource = [];

    for (const [key, value] of getIterableObjectEntries(source)) {

      if (value === this.required) {
        requiredsOnSource.push(key);
      } else {
        Reflect.defineProperty(trgt, key, Reflect.getOwnPropertyDescriptor(source, key));
      }
    }

    for (const requiredOnSource of requiredsOnSource) {

      if (!trgt[requiredOnSource] || trgt[requiredOnSource] === this.required) {

        throw new Error(`Member "${requiredOnSource}" remained unimplemented`);
      }
    }

    for (const [key, value] of getIterableObjectEntries(trgt)) {

      if (value === this.required) {

        throw new Error(`Member "${key}" remained unimplemented`);
      }
    }

    for (const [key, value] of getIterableObjectEntries(Reflect.getPrototypeOf(trgt))) {

      if (!Reflect.ownKeys(trgt).includes(key) && (value === this.required)) {

        throw new Error(`Member "${key}" remained unimplemented`);
      }
    }

    return trgt;
  },

  /**
   * Composes a series of talents into one.
   * @param {...Talent} talents The talents to compose
   * @returns {Talent} The composed talent
   */
  composeTalents(...talents) {

    for (const source of talents) {

      if (!source.constructor.toString().includes("class Talent {")) {
        throw new TypeError(`Parameter ${source} is not a talent`);
      }
    }

    let memberLog = [];

    for (const source of talents) {

      memberLog = addSourceInfoToML(memberLog, source);
    }

    memberLog = parseML(memberLog, this.required);

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

  /**
   * Aliases (renames in this case) a member of a talent
   * @param {Talent} talent The talent which member has to be aliased
   * @param {string} oldName The name of the member to be aliased
   * @param {string} newName The alias
   * @returns {Talent} The talent with the aliased member
   */
  alias(talent, oldName, newName) {

    if (!Talent.typeCheck(talent)) {

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

  /**
   * Excludes a member from a talent
   * @param {Talent} talent The talent which member has to be excluded
   * @param {string} name The name of the member to be excluded
   * @returns {Talent} The talent with the excluded member
   */
  exclude(talent, name) {

    if (!Talent.typeCheck(talent)) {

      throw new TypeError("The target has to be a talent");
    }

    if (typeof name !== "string") {

      throw new TypeError("The method name has to be a string");
    }

    return Talent.removeProperty(talent, name);
  }
};
