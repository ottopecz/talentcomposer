const {copyOwnProps} = require("./util");

class Talent {

  constructor(record) {

    copyOwnProps(this, record);
  }

  static addProperty(talent, keyValue) {

    const key = Reflect.ownKeys(keyValue)[0];
    const valueDesc = Reflect.getOwnPropertyDescriptor(keyValue, key);
    const record = copyOwnProps({}, talent);

    Reflect.defineProperty(record, key, valueDesc);

    return new Talent(record);
  }

  static removeProperty(talent, key) {

    const record = copyOwnProps({}, talent);

    Reflect.deleteProperty(record, key);

    return new Talent(record);
  }
}

module.exports = Talent;
