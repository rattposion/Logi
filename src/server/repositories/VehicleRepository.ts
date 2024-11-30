import { Vehicle } from '@/types';
import db from '@/lib/db';

export class VehicleRepository {
  static async findAll(): Promise<Vehicle[]> {
    return db.query<Vehicle[]>('SELECT * FROM vehicles ORDER BY created_at DESC');
  }

  static async findById(id: number): Promise<Vehicle | null> {
    const [vehicle] = await db.query<Vehicle[]>(
      'SELECT * FROM vehicles WHERE id = ?',
      [id]
    );
    return vehicle || null;
  }

  static async create(data: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> {
    const [result] = await db.query<any>(
      'INSERT INTO vehicles (plate, model, year, fuel_type, cargo_capacity, location) VALUES (?, ?, ?, ?, ?, ?)',
      [data.plate, data.model, data.year, data.fuelType, data.cargoCapacity, data.location]
    );

    const vehicle = await this.findById(result.insertId);
    if (!vehicle) {
      throw new Error('Failed to create vehicle');
    }
    return vehicle;
  }

  static async update(id: number, data: Partial<Vehicle>): Promise<Vehicle | null> {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);

    await db.query(
      `UPDATE vehicles SET ${fields} WHERE id = ?`,
      [...values, id]
    );
    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await db.query<any>(
      'DELETE FROM vehicles WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}