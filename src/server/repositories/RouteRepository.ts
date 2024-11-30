import { Route } from '@/types';
import db from '@/lib/db';

export class RouteRepository {
  static async findAll(): Promise<Route[]> {
    return db.query<Route[]>('SELECT * FROM routes ORDER BY created_at DESC');
  }

  static async findById(id: string): Promise<Route | null> {
    const [route] = await db.query<Route[]>(
      'SELECT * FROM routes WHERE id = ?',
      [id]
    );
    return route || null;
  }

  static async create(data: Omit<Route, 'createdAt' | 'updatedAt'>): Promise<Route> {
    await db.query(
      'INSERT INTO routes (id, name, origin_state, destination_state) VALUES (?, ?, ?, ?)',
      [data.id, data.name, data.originState, data.destinationState]
    );
    
    const route = await this.findById(data.id);
    if (!route) {
      throw new Error('Failed to create route');
    }
    return route;
  }

  static async update(id: string, data: Partial<Route>): Promise<Route | null> {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);

    await db.query(
      `UPDATE routes SET ${fields} WHERE id = ?`,
      [...values, id]
    );
    return this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const [result] = await db.query<any>(
      'DELETE FROM routes WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}