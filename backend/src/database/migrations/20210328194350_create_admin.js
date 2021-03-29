exports.up = function(knex) {
    return knex.schema.createTable('admin', function(table){
        table.increments('id');
        table.string('name', 60).notNullable();
        table.string('email', 60).notNullable().unique();
        table.string('password', 60).notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('admin');
};
