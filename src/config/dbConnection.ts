import mysql from 'mysql2'
import { DBConfig, DBConfigLocal } from './dbConfig'

// railway
// export const DB = mysql.createConnection(`${DBConfig.URL}`)

// local
export const DBLocal = mysql.createConnection({
    host: DBConfigLocal.HOST,
    user: DBConfigLocal.USER,
    password: DBConfigLocal.PASSWORD,
    database: DBConfigLocal.DATABASE,
})