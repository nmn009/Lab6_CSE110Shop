// Script.js

let cart = [];
let products = [];

window.addEventListener('DOMContentLoaded', async () => {
  if (window.localStorage.getItem('products')) {
    products = JSON.parse(window.localStorage.getItem('products'));
  } else {
    const res = await fetch('https://fakestoreapi.com/products');
    products = await res.json();
    window.localStorage.setItem('products', JSON.stringify(products));
  }

  if (window.localStorage.getItem('cart')) {
    cart = JSON.parse(window.localStorage.getItem('cart'));
  } else {
    cart = [];
    saveCart();
  }

  redrawProducts();
});

function redrawProducts() {
  const container = document.getElementById('product-list');
  // clear children
  container.innerHTML = null;
  // readd
  for (const product of products) {
    const elem = document.createElement('product-item');
    elem.setAttribute('product', JSON.stringify(product));
    elem.setAttribute('in-cart', cart.includes(product.id).toString())
    container.appendChild(elem);
  }
  document.getElementById('cart-count').innerText = cart.length.toString();
}

function saveCart() {
  window.localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id) {
  cart.push(id);
  redrawProducts();
  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(existing => existing !== id);
  redrawProducts();
  saveCart();
}
