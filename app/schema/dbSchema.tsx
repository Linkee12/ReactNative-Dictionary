import { SQLiteDatabase } from "expo-sqlite";

export default async function migrateDbIfNeeded(db: SQLiteDatabase) {
  await db.execAsync('DROP TABLE IF EXISTS words');
  await db.execAsync('DROP TABLE IF EXISTS settings');

  await db.execAsync('PRAGMA journal_mode = "wal"');

  await db.execAsync(`
    CREATE TABLE words (
      id INTEGER PRIMARY KEY NOT NULL,
      hun TEXT NOT NULL,
      eng TEXT NOT NULL
    )
  `);

  await db.execAsync(`
    CREATE TABLE settings (
      id INTEGER PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    )
  `);

  await db.execAsync(`INSERT INTO words (hun, eng) VALUES ('Hello', 'Word')`);
  await db.execAsync(`INSERT INTO settings (value) VALUES ('hun')`);
}