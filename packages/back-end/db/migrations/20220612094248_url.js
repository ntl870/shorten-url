/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('url', (table) => {
    table.increments('id').primary()
    table.string('real_url').notNullable()
    table.string('shorten_url').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.queryBuilder('SELECT 1')
}
