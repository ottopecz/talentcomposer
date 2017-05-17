const {getIterableObjectEntries} = require("./util");
const symbol = Symbol("required member");

/**
 * Represents a talent
 * @class
 */
class Talent {

  /**
   * Constructs an instance
   * @param {Object} record The source record of a talent. Usually an object literal.
   */
  constructor(record) {

    Talent.copyOwnProps(this, record);
  }

  /**
   * Copies the own properties from one object to an other
   * @param {Object} target The target of the copy
   * @param {Object} source The source of the copy
   * @static
   * @returns {Object} The result of the copy
   */
  static copyOwnProps(target, source) {

    const trgt = target;

    for (const [key, value] of getIterableObjectEntries(source)) {

      if ((typeof value === "symbol") && value.toString().includes("required member")) {

        trgt[key] = Talent.required;
      } else {

        Reflect.defineProperty(trgt, key, Reflect.getOwnPropertyDescriptor(source, key));
      }
    }

    return trgt;
  }

  /**
   * Adds a new property to a talent
   * @param {Talent} talent The talent to add new member to
   * @param {Object} keyValue The key value pair of the new property wrapped up in an object literal
   * @static
   * @returns {Talent} The extended talent
   */
  static addProperty(talent, keyValue) {

    const key = Reflect.ownKeys(keyValue)[0];
    const valueDesc = Reflect.getOwnPropertyDescriptor(keyValue, key);
    const record = Talent.copyOwnProps({}, talent);

    Reflect.defineProperty(record, key, valueDesc);

    return new Talent(record);
  }

  /**
   * Removes a property from a talent
   * @param {Talent} talent The talent to remove a member from
   * @param {string} key The name of the meber to be removed
   * @static
   * @returns {Talent} The ripped off talent
   */
  static removeProperty(talent, key) {

    const record = Talent.copyOwnProps({}, talent);

    Reflect.deleteProperty(record, key);

    return new Talent(record);
  }

  /**
   * Checks if the parameter is a talent
   * @param {*} param The parameter to check
   * @static
   * @returns {boolean} True if the parameter is a talent
   */
  static typeCheck(param) {

    return (param instanceof Talent);
  }

  /**
   * Retrieves the required marker
   * @static
   * @returns {Symbol} The required marker
   */
  static get required() {

    return symbol;
  }
}

module.exports = Talent;
