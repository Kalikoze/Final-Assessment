exports.seed = (knex, Promise) => {
  return knex('inventory').del()
    .then(() => {
      return knex('inventory').insert([
        {
          id: 1,
          title: 'PS4 Pro',
          item_description: 'The latest Sony Console with 4k capabilities.',
          img_url: 'https://media.playstation.com/is/image/SCEA/playstation-4-pro-vertical-product-shot-01-us-07sep16?$TwoColumn_Image$',
          price: 400.00
        },
        {
          id: 2,
          title: 'Focal SM9 Studio Monitors',
          item_description: 'Amazing sounding studio monitors with a very flat response.',
          img_url: 'https://cdn3.volusion.com/b3o4z.gn3gt/v/vspfiles/photos/9999-16793-2.jpg?1502113947',
          price: 1000
        },
        {
          id: 3,
          title: 'Amazon Viola',
          item_description: 'Get an Amazon viola for extremely cheap and jump right in!',
          img_url: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Bratsche.jpg',
          price: 199.99
        },
        {
          id: 4,
          title: 'Samsung 4k QLED TV',
          item_description: 'The latest Samsung TV with QLED technology.',
          img_url: 'https://s7d2.scene7.com/is/image/SamsungUS/qn65q9famfxza-gallery1-0313?$product-details-jpg$',
          price: 3299.99
        },
      ]);
    });
};
