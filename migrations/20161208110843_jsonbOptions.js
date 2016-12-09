
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('polls', function(table) {
      table.dropColumn('options')
    }),
    knex.schema.table('polls', function(table) {
      table.jsonb('options').notNullable()
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('polls', function(table) {
      table.dropColumn('options')
    })    
  ]) 
};
