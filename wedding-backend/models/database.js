const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Ensure data directory exists
const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const DB_PATH = process.env.DB_PATH || path.join(dataDir, "wedding.db");

let db;

// Initialize database connection
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error("Error opening database:", err);
        reject(err);
      } else {
        console.log("Connected to SQLite database");
        createTables().then(resolve).catch(reject);
      }
    });
  });
}

// Create database tables
function createTables() {
  return new Promise((resolve, reject) => {
    // First create all tables
    const tableQueries = [
      // Accommodations table
      `CREATE TABLE IF NOT EXISTS accommodations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guest_name TEXT NOT NULL,
        selected_events TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,

      // RSVPs table
      `CREATE TABLE IF NOT EXISTS rsvps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guest_name TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('attending', 'not-attending')),
        selected_events TEXT,
        timestamp TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(guest_name)
      )`,

      // Messages table
      `CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guest_name TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        status TEXT DEFAULT 'unread',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
    ];

    // Then create indexes
    const indexQueries = [
      `CREATE INDEX IF NOT EXISTS idx_accommodations_guest ON accommodations(guest_name)`,
      `CREATE INDEX IF NOT EXISTS idx_rsvps_guest ON rsvps(guest_name)`,
      `CREATE INDEX IF NOT EXISTS idx_messages_guest ON messages(guest_name)`,
      `CREATE INDEX IF NOT EXISTS idx_accommodations_timestamp ON accommodations(timestamp)`,
      `CREATE INDEX IF NOT EXISTS idx_rsvps_timestamp ON rsvps(timestamp)`,
      `CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp)`,
    ];

    // Function to run queries sequentially
    async function runQueries(queries, description) {
      for (let i = 0; i < queries.length; i++) {
        await new Promise((resolveQuery, rejectQuery) => {
          db.run(queries[i], (err) => {
            if (err) {
              console.error(`Error in ${description} ${i}:`, err);
              rejectQuery(err);
            } else {
              resolveQuery();
            }
          });
        });
      }
    }

    // Run table creation first, then indexes
    runQueries(tableQueries, "table creation")
      .then(() => {
        console.log("✅ All database tables created successfully");
        return runQueries(indexQueries, "index creation");
      })
      .then(() => {
        console.log("✅ All database indexes created successfully");
        resolve();
      })
      .catch((error) => {
        console.error("❌ Error creating database schema:", error);
        reject(error);
      });
  });
}

// Database operations for accommodations
const accommodationQueries = {
  create: (guestName, selectedEvents, timestamp) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO accommodations (guest_name, selected_events, timestamp) VALUES (?, ?, ?)`;
      db.run(
        sql,
        [guestName, JSON.stringify(selectedEvents), timestamp],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, guestName, selectedEvents, timestamp });
          }
        },
      );
    });
  },

  getByGuest: (guestName) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM accommodations WHERE guest_name = ? ORDER BY created_at DESC`;
      db.all(sql, [guestName], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            rows.map((row) => ({
              ...row,
              selected_events: JSON.parse(row.selected_events),
            })),
          );
        }
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM accommodations ORDER BY created_at DESC`;
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            rows.map((row) => ({
              ...row,
              selected_events: JSON.parse(row.selected_events),
            })),
          );
        }
      });
    });
  },
};

// Database operations for RSVPs
const rsvpQueries = {
  createOrUpdate: (guestName, status, selectedEvents, timestamp) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT OR REPLACE INTO rsvps (guest_name, status, selected_events, timestamp, updated_at) 
                   VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`;
      db.run(
        sql,
        [guestName, status, JSON.stringify(selectedEvents || []), timestamp],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id: this.lastID || this.changes,
              guestName,
              status,
              selectedEvents,
              timestamp,
            });
          }
        },
      );
    });
  },

  getByGuest: (guestName) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM rsvps WHERE guest_name = ?`;
      db.get(sql, [guestName], (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            resolve({
              ...row,
              selected_events: JSON.parse(row.selected_events || "[]"),
            });
          } else {
            resolve(null);
          }
        }
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM rsvps ORDER BY created_at DESC`;
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            rows.map((row) => ({
              ...row,
              selected_events: JSON.parse(row.selected_events || "[]"),
            })),
          );
        }
      });
    });
  },
};

// Database operations for messages
const messageQueries = {
  create: (guestName, message, timestamp) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO messages (guest_name, message, timestamp) VALUES (?, ?, ?)`;
      db.run(sql, [guestName, message, timestamp], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, guestName, message, timestamp });
        }
      });
    });
  },

  getByGuest: (guestName) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM messages WHERE guest_name = ? ORDER BY created_at DESC`;
      db.all(sql, [guestName], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM messages ORDER BY created_at DESC`;
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  markAsRead: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE messages SET status = 'read', updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, changes: this.changes });
        }
      });
    });
  },
};

// Close database connection
function closeDatabase() {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log("Database connection closed");
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}

// Export functions
module.exports = {
  initializeDatabase,
  accommodationQueries,
  rsvpQueries,
  messageQueries,
  closeDatabase,
  getDatabase: () => db,
};
