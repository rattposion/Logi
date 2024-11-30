import { Pool, Connection } from 'mysql2/promise';
import db from '@/lib/db';

export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = db.pool;
  }

  async getConnection(): Promise<Connection> {
    return this.pool.getConnection();
  }

  async query<T>(sql: string, params?: any[]): Promise<T> {
    return db.query<T>(sql, params);
  }

  async transaction<T>(callback: (connection: Connection) => Promise<T>): Promise<T> {
    const connection = await this.getConnection();
    await connection.beginTransaction();

    try {
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.query('SELECT 1');
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const databaseService = new DatabaseService();