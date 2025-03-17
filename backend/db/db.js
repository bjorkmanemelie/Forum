
const sqlite3 = require("better-sqlite3");
const path = require("path");

// Skapa databasanslutning
const db = sqlite3(path.join(__dirname, "../database.db"));

// Skapa tabeller om de inte finns
const createTables = () => {
  const threadSchema = `
    CREATE TABLE IF NOT EXISTS threads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const replySchema = `
    CREATE TABLE IF NOT EXISTS replies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      thread_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (thread_id) REFERENCES threads (id)
    )
  `;

  db.exec(threadSchema);
  db.exec(replySchema);
  console.log("Database tables created or already exist");
};

createTables();

module.exports = db;
