const {copyOwnProps} = require("./util");

class Talent {

  constructor(record) {

    copyOwnProps(this, record);
  }
}

module.exports = Talent;
