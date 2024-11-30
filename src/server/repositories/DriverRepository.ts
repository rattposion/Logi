import { Driver } from '@/types';
import db from '@/lib/db';

export class DriverRepository {
  static async findAll(): Promise<Driver[]> {
    return db.query<Driver[]>('SELECT * FROM drivers ORDER BY created_at DESC');
  }

  static async findById(id: number): Promise<Driver | null> {
    const [driver] = await db.query<Driver[]>(
      'SELECT * FROM drivers WHERE id = ?',
      [id]
    );
    return driver || null;
  }

  static async findByCPF(cpf: string): Promise<Driver | null> {
    const [driver] = await db.query<Driver[]>(
      'SELECT * FROM drivers WHERE cpf = ?',
      [cpf]
    );
    return driver || null;
  }

  static async create(data: Omit<Driver, 'id' | 'createdAt' | 'updatedAt'>): Promise<Driver> {
    const [result] = await db.query<any>(
      'INSERT INTO drivers (name, cpf, cnh_category, cnh_number, cnh_expiration) VALUES (?, ?, ?, ?, ?)',
      [data.name, data.cpf, data.cnhCategory, data.cnhNumber, data.cnhExpiration]
    );
    const driver = await this.findById(result.insertId);
    if (!driver) {
      throw new Error('Failed to create driver');
    }
    return driver;
  }

  static async update(id: number, data: Partial<Driver>): Promise<Driver | null> {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);

    await db.query(
      `UPDATE drivers SET ${fields} WHERE id = ?`,
      [...values, id]
    );
    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await db.query<any>(
      'DELETE FROM drivers WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}