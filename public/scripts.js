const appendInventory = (inventory) => {
  inventory.forEach(item => {
    $('.inventory').append(`
        <article class='item'>
        <section class='item-info'>
          <h3>${item.title}</h3>
          <p class='description'>
          Description: ${item['item_description']}
          </p>
        </section>
        <img src='${item['img_url']}'/>
        <p class='price'>${item.price}</p>
        <button>Add To Cart</button>
        <article>
      `)
  })
}

const fetchInventory = () => {
  fetch('/api/v1/inventory')
    .then(response => response.json())
    .then(inventory => appendInventory(inventory))
}


$(document).ready(fetchInventory)
