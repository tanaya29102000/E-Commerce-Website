const categories = [];
let i = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function fetchData() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    data.forEach(item => categories.push(item));
    displayProducts();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayProducts() {
  document.getElementById('root').innerHTML = categories.map((item) => {
    var { image, title, price } = item;
    return (
      `<div class='box'>
        <div class='img-box'>
          <img class='images' src=${image}></img>
        </div>
        <div class='bottom'>
          <p>${title}</p>
          <h2>$ ${price}</h2>` +
      "<button onclick='addtocart(" + (i++) + ")'>Add to cart</button>" +
      `</div>
      </div>`
    )
  }).join('');
}

function addtocart(a) {
  const item = categories[a];
  const cartItem = cart.find(cartItem => cartItem.id === item.id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  displaycart();
}

function delElement(a) {
  cart.splice(a, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displaycart();
}

function clearCart() {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  displaycart();
}

function displaycart() {
  let j = 0, total = 0;
  document.getElementById("count").innerHTML = cart.length;
  if (cart.length == 0) {
    document.getElementById('cartItem').innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$ 0.00";
  } else {
    document.getElementById("cartItem").innerHTML = cart.map((items) => {
      var { image, title, price, quantity } = items;
      total += price * quantity;
      document.getElementById("total").innerHTML = "$ " + total.toFixed(2);
      return (
        `<div class='cart-item'>
          <div class='row-img'>
            <img class='rowimg' src=${image}>
          </div>
          <p style='font-size:12px;'>${title}</p>
          <p>Quantity: ${quantity}</p>
          <h2 style='font-size: 15px;'>$ ${(price * quantity).toFixed(2)}</h2>` +
        "<i class='fa-solid fa-trash' onclick='delElement(" + (j++) + ")'></i></div>"
      );
    }).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  displaycart(); // Ensure the cart is displayed correctly when the page loads
});
