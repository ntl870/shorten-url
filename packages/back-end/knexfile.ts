// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import 'dotenv/config'
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'okita123',
      database: 'shorten_url'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_ADDON_HOST,
      port: 3306,
      database: process.env.MYSQL_ADDON_DB,
      user: process.env.MYSQL_ADDON_USER,
      password: process.env.MYSQL_ADDON_PASSWORD
    }
  }
}
