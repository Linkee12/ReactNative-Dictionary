import { SQLiteDatabase } from "expo-sqlite";

export default async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    const result = await db.getFirstAsync<{ user_version: number }>(
        'PRAGMA user_version'
    );
    if (result) {
        let { user_version: currentDbVersion } = result
        if (currentDbVersion >= DATABASE_VERSION) {
            return;
        }
        if (currentDbVersion === 0) {
            await db.execAsync(`
          PRAGMA journal_mode = 'wal';
          CREATE TABLE words (id INTEGER PRIMARY KEY NOT NULL, hun TEXT NOT NULL, eng TEXT NOT NULL);
          `);
            await db.runAsync('CREATE TABLE sentences (id INTEGER PRIMARY KEY NOT NULL, content TEXT , wordId INTEGER)');
            await db.runAsync('INSERT INTO words (hun, eng) VALUES (?, ?)', 'hello', 'hello');
            await db.runAsync('INSERT INTO words (hun, eng) VALUES (?, ?)', 'world', 'világ');
            currentDbVersion = 1;
        }
        // if (currentDbVersion === 1) {
        //   Add more migrations
        // }
        await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    }
}