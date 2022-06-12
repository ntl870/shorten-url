import mysql from 'mysql'
console.log(process.env.MYSQL_ADDON_HOST)
export const db = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  database: process.env.MYSQL_ADDON_DB,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD
})
