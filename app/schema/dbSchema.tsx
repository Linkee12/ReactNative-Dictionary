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
        if (currentDbVersion === 1) {
            await db.execAsync('PRAGMA journal_mode = "wal"');
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS words (
                    id INTEGER PRIMARY KEY NOT NULL,
                    hun TEXT NOT NULL,
                    eng TEXT NOT NULL
                )
            `);
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS settings (
                    id INTEGER PRIMARY KEY NOT NULL,
                    value TEXT NOT NULL
                )
            `);
            await db.execAsync(`
                INSERT INTO words (hun, eng) VALUES ('Hello', 'Word')
            `);
            await db.execAsync(`
                INSERT INTO settings (value) VALUES ('hun')
            `);
        }
        // if (currentDbVersion === 5) {
        //   Add more migrations
        // }
        await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    }
}