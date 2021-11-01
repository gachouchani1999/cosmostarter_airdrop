const { DatabaseWrapper } = require("../database/wrapper");

const schema = {
  name: "TEXT",
  address: "TEXT",
  ts: "INTEGER",
};

class Wallet extends DatabaseWrapper {
  constructor(db) {
    super("Wallet", db, schema);
  }
}

module.exports = {
  schema,
  controller: Wallet,
};
