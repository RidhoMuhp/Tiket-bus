import 'dotenv/config'

export const PORT = process.env.PORT || 3001
// Nomor admin untuk tautan WhatsApp, format internasional tanpa tanda +.
export const WHATSAPP_ADMIN_NUMBER = process.env.WHATSAPP_ADMIN_NUMBER || '6285179557691'
export const databaseConfig = {
  client: process.env.DB_CLIENT || 'sqlite',
  sqliteFile: process.env.SQLITE_FILE || './bustara.db',
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'bustara',
  },
}
