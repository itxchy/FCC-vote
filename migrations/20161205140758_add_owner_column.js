
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('polls', function(table) {
      table.string('owner').notNullable()
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('polls', function(table) {
      table.dropColumn('owner')
    })    
  ]) 
};
