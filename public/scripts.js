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
          <p class='price'>Price: $${item.price}</p>
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
  $('.cart').after(`
    <section class="append-display">
      <p>Cart Display</p>
    </section>
     `)
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

$(document).ready(fetchInventory);
$('.cart').click(cartClick);
$('.order-history').click(orderClick)
