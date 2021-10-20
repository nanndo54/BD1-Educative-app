import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
}

function configureDatabase() {
  return mysql.createPool(config)
}

const pool = configureDatabase()

export default pool
