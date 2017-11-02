const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3001);

app.get('/api/v1/inventory', (request, response) => {
  db('inventory').select()
    .then(inventory =>
        !inventory.length ? response.status(404).json({ error: 'Inventory could not be found.' }) : response.status(200).json(inventory)
    )
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/order_history', (request, response) => {
  db('order_history').select()
    .then(orderHistory =>
        !orderHistory.length ? response.status(404).json({ error: 'Order History could not be found.' }) : response.status(200).json(orderHistory)
    )
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/order_history', (request, response) => {
  const order = request.body;

  if (!order['total_price']) {
    return response.status(422).send({
      error: `Expected format: {'total_price': <decimal>}.  You are missing a ${requiredParameter} property.`
    });
  };

  db('order_history').insert(order, '*')
    .then(order => response.status(201).json(order))
    .catch(error => response.status(500).json({ error }));
});


app.listen(app.get('port'), () => {
	console.log(`Amazon Bay is running on ${app.get('port')}.`);
});

module.exports = app;
