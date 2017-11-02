const appendInventory = (inventory) => {
  inventory.forEach(item => {
    $('.inventory').append(`
        <article class='item'>
        <img src='${item['img_url']}'/>
        <section class='item-info'>
          <h3>${item.title}</h3>
          <p class='description'>
          Description: ${item['item_description']}
          </p>
          <p class='price'>Price: $<span>${item.price}</span></p>
          <button>Add To Cart</button>
        </section>
        </article>
      `)
  })
}

const fetchInventory = () => {
  fetch('/api/v1/inventory')
    .then(response => response.json())
    .then(inventory => appendInventory(inventory))
}

const cartClick = () => {
  $('.inventory').css('display') === 'flex' ? displayCart() : display()
}

const orderClick = () => {
  $('.inventory').css('display') === 'flex' ? displayOrder() : display()
}

const displayCart = () => {
  $('.inventory').css('display', 'none')
  appendCart()
}

const appendCart = () => {
  const storedItems = JSON.parse(localStorage.getItem('shoppingItems')) || [];
  $('.cart').after(`
    <section class="append-display">
      <section class="cart-display">
        <h2>Shopping Cart</h2>
        <p class='item-column'>Items</p>
        <section class='shopping-items'>
        </section>
        <p class='shopping-total'></p>
        <button class='purchase'>Complete Purchase</button>
      </section>
    </section>
     `)

    displayShoppingCart(storedItems)
}

const displayShoppingCart = (storedItems) => {
  let total = 0;

  storedItems.forEach(item => {
    $('.shopping-items').append(`
      <section class='shopping-item'>
        <p>${item.title}</p>
        <p class='shopping-price'>Price: $<span>${item.price}</span></p>
      </section>
      `)
  });

  $('.shopping-price span').each((i, price) => total += JSON.parse($(price).text()));
  $('.shopping-total').append(`Total: <span>${total}<span>`)
}

const displayOrder = () => {
  $('.inventory').css('display', 'none')
  appendOrder();
}

const appendOrder = () => {
  $('.order-history').before(`
    <section class="append-display">
      <p>Order Display</p>
    </section>
    `)
}

const display = () => {
  $('.inventory').css('display', 'flex')
  $('.append-display').remove();
}

const saveItem = e => {
  const storedItems = JSON.parse(localStorage.getItem('shoppingItems')) || [];
  const title = $(e.target).closest('.item').find('h3').text();
  const price = $(e.target).closest('.item').find('.price span').text();
  storedItems.push({title, price})
  localStorage.setItem('shoppingItems', JSON.stringify(storedItems))
}

const postTotal = e => {
  const total = $('.shopping-total span').text();
  if (total !== '0') {
    fetch('/api/v1/order_history', {
      method: 'POST',
      body: JSON.stringify({['total_price']: total}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(order => (cartClick(), localStorage.clear()))
  }
}

$(document).ready(fetchInventory);
$('.cart').click(cartClick);
$('.order-history').click(orderClick);
$('.inventory').on('click', 'button', saveItem)
$(document).on('click', '.purchase', postTotal)
