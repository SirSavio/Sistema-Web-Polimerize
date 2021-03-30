exports.up = function(knex) {
    return knex.schema.createTable('sample', function(table){
        table.increments('id');
        table.string('code', 255).notNullable().unique();
        table.string('patientName',60).notNullable();
        table.string('description', 500).notNullable();
        table.string('state', 500).notNullable();
        table.date('date').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('sample');
};
