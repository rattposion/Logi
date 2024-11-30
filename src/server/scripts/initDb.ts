import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  try {
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Create tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        plate VARCHAR(10) UNIQUE NOT NULL,
        model VARCHAR(100) NOT NULL,
        year INT,
        fuel_type VARCHAR(50),
        cargo_capacity DECIMAL(10,2),
        location VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS drivers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        cpf VARCHAR(14) UNIQUE NOT NULL,
        cnh_category VARCHAR(5),
        cnh_number VARCHAR(20),
        cnh_expiration DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS routes (
        id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        origin_state CHAR(2) NOT NULL,
        destination_state CHAR(2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS trips (
        id INT AUTO_INCREMENT PRIMARY KEY,
        competence_month VARCHAR(7) NOT NULL,
        departure_date DATETIME NOT NULL,
        route_id VARCHAR(10) NOT NULL,
        vehicle_id INT NOT NULL,
        driver_id INT NOT NULL,
        initial_km DECIMAL(10,2) NOT NULL,
        final_km DECIMAL(10,2),
        service_start DATETIME NOT NULL,
        service_end DATETIME,
        task_id VARCHAR(50),
        invoice_number VARCHAR(50),
        delivery_status BOOLEAN DEFAULT FALSE,
        manifest_number VARCHAR(50),
        items_quantity INT,
        invoice_total DECIMAL(10,2),
        cubic_meters DECIMAL(10,2),
        logistics_cost DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (route_id) REFERENCES routes(id),
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
        FOREIGN KEY (driver_id) REFERENCES drivers(id)
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS fuel_records (
        id INT AUTO_INCREMENT PRIMARY KEY,
        trip_id INT NOT NULL,
        vehicle_id INT NOT NULL,
        liters DECIMAL(10,2) NOT NULL,
        fuel_type VARCHAR(50) NOT NULL,
        price_per_liter DECIMAL(10,2) NOT NULL,
        total_cost DECIMAL(10,2) NOT NULL,
        date DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (trip_id) REFERENCES trips(id),
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
      )
    `);

    console.log('Database and tables created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

initializeDatabase().catch(console.error);