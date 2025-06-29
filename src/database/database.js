import Database from 'better-sqlite3';

class DatabaseService {
  #db;
  constructor(dbFile) {
    try {
      this.#db = new Database(dbFile);
      console.log(`Conexão com o banco de dados '${dbFile}' estabelecida com sucesso.`);
    } catch (err) {
      console.error('Falha ao conectar com o banco de dados:', err);
      throw err;
    }
  }

  getAdapter() {
    return {
      get: (sql, params, callback) => {
        try {
          const stmt = this.#db.prepare(sql);
          const result = stmt.get(...params);
          callback(null, result);
        } catch (err) {
          callback(err, null);
        }
      },
      run: (sql, params, callback) => {
        try {
          const stmt = this.#db.prepare(sql);
          const info = stmt.run(...params);
          const context = { lastID: info.lastInsertRowid };
          callback.call(context, null);
        } catch (err) {
          callback.call(null, err);
        }
      },
    };
  }
}

const databaseService = new DatabaseService('database.db');

export default databaseService;