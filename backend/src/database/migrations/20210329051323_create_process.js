exports.up = function(knex) {
    return knex.schema.createTable('process', function(table){
        table.increments('id');
        table.string('name', 60).notNullable();
        table.string('describe', 255).notNullable();

        table.integer('id_sample').unsigned().notNullable();
        table.foreign('id_sample').references('id').inTable('sample');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('process');
};
