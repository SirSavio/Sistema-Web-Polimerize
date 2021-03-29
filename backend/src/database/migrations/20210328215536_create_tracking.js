exports.up = function(knex) {
    return knex.schema.createTable('tracking', function(table){
        table.increments('id');
        table.string('state', 60).notNullable();
        table.date('date').notNullable();

        table.integer('id_sample').unsigned().notNullable();
        table.foreign('id_sample').references('id').inTable('sample');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tracking');
};
