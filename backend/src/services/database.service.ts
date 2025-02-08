import { Database as SQLiteDB } from 'sqlite';
import { getDatabase } from '../config/database';

export class DatabaseService {
    private db: SQLiteDB | null = null;

    private async getDb(): Promise<SQLiteDB> {
        if (!this.db) {
            this.db = await getDatabase();
        }
        return this.db;
    }

    async query<T>(sql: string, params: any[] = []): Promise<T[]> {
        const db = await this.getDb();
        return db.all<T>(sql, params);
    }

    async queryOne<T>(sql: string, params: any[] = []): Promise<T | undefined> {
        const db = await this.getDb();
        return db.get<T>(sql, params);
    }

    async execute(sql: string, params: any[] = []): Promise<void> {
        const db = await this.getDb();
        await db.run(sql, params);
    }

    async beginTransaction(): Promise<void> {
        const db = await this.getDb();
        await db.run('BEGIN TRANSACTION');
    }

    async commitTransaction(): Promise<void> {
        const db = await this.getDb();
        await db.run('COMMIT');
    }

    async rollbackTransaction(): Promise<void> {
        const db = await this.getDb();
        await db.run('ROLLBACK');
    }
}

export const dbService = new DatabaseService();
