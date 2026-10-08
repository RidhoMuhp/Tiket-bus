import Database from 'better-sqlite3'
import mysql from 'mysql2/promise'
import { databaseConfig } from './config.js'

let sqliteDb
let mysqlPool

const createBookingsTable = `CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT, code TEXT NOT NULL, route TEXT NOT NULL,
  passenger TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, seats TEXT NOT NULL,
  date TEXT NOT NULL, total INTEGER NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP
)`

const createMySqlBookingsTable = `CREATE TABLE IF NOT EXISTS bookings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, code VARCHAR(32) NOT NULL,
  route VARCHAR(255) NOT NULL, passenger VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL,
  phone VARCHAR(32), seats JSON NOT NULL, date VARCHAR(100) NOT NULL,
  total BIGINT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

export async function initializeDatabase() {
  if (databaseConfig.client === 'mysql') {
    mysqlPool = mysql.createPool({ ...databaseConfig.mysql, waitForConnections: true })
    await mysqlPool.query(createMySqlBookingsTable)
    console.log(`Database MySQL terhubung: ${databaseConfig.mysql.database}`)
    return
  }

  sqliteDb = new Database(databaseConfig.sqliteFile)
  sqliteDb.exec(createBookingsTable)
  console.log(`Database SQLite aktif: ${databaseConfig.sqliteFile}`)
}

export async function saveBooking(booking) {
  const values = [
    booking.code,
    booking.route,
    booking.passenger,
    booking.email,
    booking.phone,
    JSON.stringify(booking.seats),
    booking.date,
    booking.total,
  ]

  if (databaseConfig.client === 'mysql') {
    const [result] = await mysqlPool.execute(
      'INSERT INTO bookings (code, route, passenger, email, phone, seats, date, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      values,
    )
    return result.insertId
  }

  const result = sqliteDb
    .prepare(
      'INSERT INTO bookings (code, route, passenger, email, phone, seats, date, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    )
    .run(...values)
  return result.lastInsertRowid
}
