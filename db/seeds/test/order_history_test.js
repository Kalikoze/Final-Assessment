exports.seed = (knex, Promise) => {
  return knex('order_history').del()
    .then(() => {
      return knex('order_history').insert([
        {
          id: 1,
          total_price: 15
        },
        {
          id: 2,
          total_price: 299
        },
        {
          id: 3,
          total_price: 481
        },
        {
          id: 4,
          total_price: 2500
        },
      ]);
    });
};
