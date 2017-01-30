const {getIterableObjectEntries} = require("./util");
const symbol = Symbol("required member");

class Talent {

  constructor(record) {

    Talent.copyOwnProps(this, record);
  }

  static copyOwnProps(target, source) {

    for (const [key, value] of getIterableObjectEntries(source)) {

      if ((typeof value === "symbol") && value.toString().includes("required member")) {

        target[key] = Talent.required;
      } else {

        Reflect.defineProperty(target, key, Reflect.getOwnPropertyDescriptor(source, key));
      }
    }

    return target;
  }

  static addProperty(talent, keyValue) {

    const key = Reflect.ownKeys(keyValue)[0];
    const valueDesc = Reflect.getOwnPropertyDescriptor(keyValue, key);
    const record = Talent.copyOwnProps({}, talent);

    Reflect.defineProperty(record, key, valueDesc);

    return new Talent(record);
  }

  static removeProperty(talent, key) {

    const record = Talent.copyOwnProps({}, talent);

    Reflect.deleteProperty(record, key);

    return new Talent(record);
  }

  static typeCheck(talent) {

    return (talent instanceof Talent);
  }

  static get required() {

    return symbol;
  }
}

module.exports = Talent;
