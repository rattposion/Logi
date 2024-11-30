import { Trip } from '@/types';
import db from '@/lib/db';

export class TripRepository {
  static async findAll(): Promise<Trip[]> {
    return db.query<Trip[]>(`
      SELECT 
        t.*,
        r.name as route_name,
        r.origin_state,
        r.destination_state,
        v.plate as vehicle_plate,
        v.model as vehicle_model,
        d.name as driver_name,
        d.cpf as driver_cpf
      FROM trips t
      LEFT JOIN routes r ON t.route_id = r.id
      LEFT JOIN vehicles v ON t.vehicle_id = v.id
      LEFT JOIN drivers d ON t.driver_id = d.id
      ORDER BY t.departure_date DESC
    `);
  }

  static async findById(id: number): Promise<Trip | null> {
    const [trip] = await db.query<Trip[]>(`
      SELECT 
        t.*,
        r.name as route_name,
        r.origin_state,
        r.destination_state,
        v.plate as vehicle_plate,
        v.model as vehicle_model,
        d.name as driver_name,
        d.cpf as driver_cpf
      FROM trips t
      LEFT JOIN routes r ON t.route_id = r.id
      LEFT JOIN vehicles v ON t.vehicle_id = v.id
      LEFT JOIN drivers d ON t.driver_id = d.id
      WHERE t.id = ?
    `, [id]);
    return trip || null;
  }

  static async create(data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> {
    const [result] = await db.query<any>(`
      INSERT INTO trips (
        competence_month, departure_date, route_id, vehicle_id, driver_id,
        initial_km, service_start, task_id, invoice_number, delivery_status,
        manifest_number, items_quantity, invoice_total, cubic_meters, logistics_cost
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      data.competenceMonth,
      data.departureDate,
      data.routeId,
      data.vehicleId,
      data.driverId,
      data.initialKm,
      data.serviceStart,
      data.taskId,
      data.invoiceNumber,
      data.deliveryStatus,
      data.manifestNumber,
      data.itemsQuantity,
      data.invoiceTotal,
      data.cubicMeters,
      data.logisticsCost
    ]);

    const trip = await this.findById(result.insertId);
    if (!trip) {
      throw new Error('Failed to create trip');
    }
    return trip;
  }

  static async update(id: number, data: Partial<Trip>): Promise<Trip | null> {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);

    await db.query(
      `UPDATE trips SET ${fields} WHERE id = ?`,
      [...values, id]
    );
    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await db.query<any>(
      'DELETE FROM trips WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  static async findActiveTrips(): Promise<Trip[]> {
    return db.query<Trip[]>(`
      SELECT 
        t.*,
        r.name as route_name,
        r.origin_state,
        r.destination_state,
        v.plate as vehicle_plate,
        v.model as vehicle_model,
        d.name as driver_name,
        d.cpf as driver_cpf
      FROM trips t
      LEFT JOIN routes r ON t.route_id = r.id
      LEFT JOIN vehicles v ON t.vehicle_id = v.id
      LEFT JOIN drivers d ON t.driver_id = d.id
      WHERE t.service_end IS NULL
      ORDER BY t.departure_date DESC
    `);
  }
}