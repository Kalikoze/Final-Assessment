const appendInventory = (inventory) => {
  inventory.forEach(item => {
    $('.inventory').append(`
        <article class='item'>
        <h3>${item.title}</h3>
        <p class='description'>
        Description: ${item['item_description']}
        </p>
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
