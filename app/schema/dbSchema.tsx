import { SQLiteDatabase } from "expo-sqlite";

export default async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  );
  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) return;

  try {
    await db.execAsync('PRAGMA journal_mode = "wal"');

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS collections (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL
  )
`);

    await db.execAsync(`
  CREATE TABLE IF NOT EXISTS pairs (
    id INTEGER PRIMARY KEY NOT NULL,
    collectionId INTEGER NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    firstPair TEXT NOT NULL,
    secondPair TEXT NOT NULL
  )
`);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY NOT NULL,
        value TEXT NOT NULL
      )
    `);
    /* 
    await db.execAsync(`
      INSERT OR IGNORE INTO settings (value) VALUES ('hun')
    `); */

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  } catch (error) {
    console.error("DB migration failed:", error);
    throw error;
  }
}
