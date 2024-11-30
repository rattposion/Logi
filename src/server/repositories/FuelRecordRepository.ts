import { FuelRecord } from '@/types';
import db from '@/lib/db';

export class FuelRecordRepository {
  static async findAll(): Promise<FuelRecord[]> {
    return db.query<FuelRecord[]>(`
      SELECT 
        f.*,
        v.plate as vehicle_plate,
        v.model as vehicle_model,
        t.task_id as trip_task_id
      FROM fuel_records f
      LEFT JOIN vehicles v ON f.vehicle_id = v.id
      LEFT JOIN trips t ON f.trip_id = t.id
      ORDER BY f.date DESC
    `);
  }

  static async findById(id: number): Promise<FuelRecord | null> {
    const [record] = await db.query<FuelRecord[]>(`
      SELECT 
        f.*,
        v.plate as vehicle_plate,
        v.model as vehicle_model,
        t.task_id as trip_task_id
      FROM fuel_records f
      LEFT JOIN vehicles v ON f.vehicle_id = v.id
      LEFT JOIN trips t ON f.trip_id = t.id
      WHERE f.id = ?
    `, [id]);
    return record || null;
  }

  static async create(data: Omit<FuelRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<FuelRecord> {
    const [result] = await db.query<any>(`
      INSERT INTO fuel_records (
        trip_id, vehicle_id, liters, fuel_type,
        price_per_liter, total_cost, date
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      data.tripId,
      data.vehicleId,
      data.liters,
      data.fuelType,
      data.pricePerLiter,
      data.totalCost,
      data.date
    ]);

    const record = await this.findById(result.insertId);
    if (!record) {
      throw new Error('Failed to create fuel record');
    }
    return record;
  }

  static async update(id: number, data: Partial<FuelRecord>): Promise<FuelRecord | null> {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);

    await db.query(
      `UPDATE fuel_records SET ${fields} WHERE id = ?`,
      [...values, id]
    );
    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await db.query<any>(
      'DELETE FROM fuel_records WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  static async getVehicleConsumption(vehicleId: number): Promise<{
    totalLiters: number;
    totalCost: number;
    averageConsumption: number;
  }> {
    const [result] = await db.query<any>(`
      SELECT 
        SUM(liters) as total_liters,
        SUM(total_cost) as total_cost,
        AVG(liters) as average_consumption
      FROM fuel_records
      WHERE vehicle_id = ?
    `, [vehicleId]);

    return {
      totalLiters: result.total_liters || 0,
      totalCost: result.total_cost || 0,
      averageConsumption: result.average_consumption || 0
    };
  }
}