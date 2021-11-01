const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const models = require("../models");

class Database {
  constructor(dbPath) {
    this.dbPath = dbPath;
    this.preExists = fs.existsSync(this.dbPath);

    // Defining database
    this.db = new sqlite3.Database(
      this.dbPath,
      sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          throw new Error(
            `failed to open database <${this.dbPath}>: ${err.message}`
          );
        }
      }
    );

    this.models = models;

    if (!this.preExists) {
      this.initDb();
    }

    this.controllers = {};
    for (let model in this.models) {
      let { controller } = this.models[model];
      this.controllers[model] = new controller(this);
    }
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async initDb() {
    let results = {};
    for (let model in this.models) {
      let { schema, controller } = this.models[model];
      const query = `
        CREATE TABLE ${model} (
          ${Object.keys(schema)
            .map((k) => `'${k}' ${schema[k]}`)
            .join(", ")}
        )
      `;
      results[model] = await this.run(query);
    }
    return results;
  }

  async close() {
    return new Promise((a, r) => this.db.close((err) => (err ? r(err) : a())));
  }
}

module.exports = Database;
