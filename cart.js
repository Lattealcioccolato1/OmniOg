let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(product) {
  if (cart[product]) {
    cart[product]++;
  } else {
    cart[product] = 1;
  }
  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '';

  for (const product in cart) {
    const quantity = cart[product];
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
      ${product} - Quantità: ${quantity} 
      <button onclick="increaseQuantity('${product}')">+</button>
      <button onclick="decreaseQuantity('${product}')">-</button>
      <button onclick="removeFromCart('${product}')">❌ Rimuovi</button>
    `;
    cartDiv.appendChild(itemDiv);
  }
}

function increaseQuantity(product) {
  cart[product]++;
  updateCart();
}

function decreaseQuantity(product) {
  if (cart[product] > 1) {
    cart[product]--;
  } else {
    removeFromCart(product);
  }
  updateCart();
}

function removeFromCart(product) {
  delete cart[product];
  updateCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Carrello salvato!');
}

function buyNow() {
  if (Object.keys(cart).length === 0) {
    alert('Il carrello è vuoto!');
    return;
  }
  alert('Grazie per il tuo acquisto!');
  cart = {};
  updateCart();
  localStorage.removeItem('cart');
}

// Per aggiornare subito se avevi già salvato
updateCart();
