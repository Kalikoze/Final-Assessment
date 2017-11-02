exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('inventory', table => {
      table.increments('id').primary();
      table.string('title');
      table.string('item_description');
      table.string('img_url');
      table.integer('price');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('order_history', table => {
      table.increments('id').primary();
      table.integer('total_price');
      table.timestamps(true, true)
    })
  ])
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('order_history'),
    knex.schema.dropTable('inventory')])
};
