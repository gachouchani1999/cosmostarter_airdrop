class DatabaseWrapper {
  constructor(modelName, db, schema) {
    this.modelName = modelName;
    this.db = db;
    this.schema = schema;
  }

  async add(values) {
    return await this.db.run(
      `
      INSERT INTO ${this.modelName} VALUES (
        ${new Array(Object.keys(this.schema).length).fill("?").join(", ")}
      )
    `,
      values
    );
  }

  async find(prop, matches) {
    return await this.db.all(
      `
      SELECT * FROM ${this.modelName} WHERE ${prop} = ?
    `,
      [matches]
    );
  }

  async delete(prop, matches) {
    return await this.db.all(
      `
      DELETE FROM ${this.modelName} WHERE ${prop} = ?
    `,
      [matches]
    );
  }

  async findById(id) {
    return await this.find("id", id);
  }

  async getAll() {
    return await this.db.all(
      `
      SELECT * FROM ${this.modelName}
    `
    );
  }
}

module.exports = { DatabaseWrapper };
