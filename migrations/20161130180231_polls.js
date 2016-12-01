
exports.up = function(knex, Promise) {
  return knex.schema.createTable('polls', function(table) {
    table.increments()
    table.string('title').notNullable().unique()
    table.json('options').notNullable()
    table.string('total_votes')
    table.timestamps()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('polls')
};
