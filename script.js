// "use strict";

// Global variables
let cartItems = [];
let totalPrice = 0;
let cartItemsCount = 0;
let subscribedEmails = [];

// DOM elements
const bagPrice = document.querySelector(".bag-price");
const badgeNumber = document.querySelector(".badge");
const checkoutTotal = document.querySelector(".checkout-total");

const searchButton = document.querySelector("#searchBtn");
const addToCartButton = document.querySelectorAll(".add-to-cart");
const bagButton = document.querySelector(".shopping-bag");
const closeButton = document.querySelector(".close-cart-btn");

const inputSearch = document.querySelector("#searchInput");
const inputSubscribe = document.querySelector(".input-field-subscribe");

const cartContainer = document.querySelector(".cart-container");
const cartItemsContainer = document.querySelector(".cart-items");
const footerContent = document.querySelector(".footer-content");
const subscribeForm = document.querySelector(".subscribe-form");

// Functions

const addToCart = (e) => {
  const product = e.target.closest(".product");
  const productName = product.querySelector("h3").innerText;
  const productPrice = +product
    .querySelector("span")
    .innerText.replace("$", "");
  const productImage = product.querySelector("img").getAttribute("src");

  let found = false;
  for (const item of cartItems) {
    if (item.name === productName) {
      item.quantity++;
      item.price += productPrice;
      cartItemsCount++;
      found = true;
      break;
    }
  }

  if (!found) {
    cartItems.push({
      name: productName,
      price: productPrice,
      img: productImage,
      quantity: 1,
    });
    cartItemsCount++;
  }

  updateCart();
};

// Function to update the cart and its related elements
const updateCart = () => {
  let totalCartPrice = 0;
  cartItems.forEach((item) => {
    totalCartPrice += item.price;
  });
  checkoutTotal.textContent = totalCartPrice.toFixed(2);
  bagPrice.textContent = totalCartPrice.toFixed(2);
  badgeNumber.style.opacity = 1;
  badgeNumber.textContent = cartItemsCount;
};

function searchFunction() {
  let input, filter, products, product, title, i;
  input = document.getElementById("searchInput");
  filter = input.value.toLowerCase();
  products = document.querySelectorAll(".product");

  products.forEach((product) => {
    title = product.getElementsByTagName("h3")[0];
    if (title.innerText.toLowerCase().indexOf(filter) > -1) {
      product.style.display = "";
    } else {
      product.style.display = "none";
    }
  });
}

// Event Handlers

// Search
searchButton.addEventListener("click", searchFunction);
inputSearch.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchFunction();
  }
});

// Add to cart
addToCartButton.forEach((btn) => btn.addEventListener("click", addToCart));

// Show cart

document.addEventListener("DOMContentLoaded", function () {
  // Show cart when bag button is clicked
  bagButton.addEventListener("click", (e) => {
    e.stopPropagation();
    cartContainer.style.right = "0";
    cartItemsContainer.innerHTML = "";

    cartItems.forEach((item) => {
      const html = `<div class="cart-item">
                        <img class="cart-img" src=${item.img} alt="Product Image">
                        <div class="item-details">
                            <h3>${item.name}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                    </div>`;
      cartItemsContainer.insertAdjacentHTML("beforeend", html);
    });
  });

  // Hide cart when close button is clicked
  closeButton.addEventListener("click", function () {
    cartContainer.style.right = "-300px";
  });

  // Hide cart when clicking anywhere else on the document
  document.body.addEventListener("click", (e) => {
    if (!cartContainer.contains(e.target) && e.target !== bagButton) {
      cartContainer.style.right = "-300px";
    }
  });
});

// Subscription

subscribeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailInput = document.querySelector(".input-field-subscribe");
  const email = emailInput.value;

  subscribedEmails.push(email);
  subscribeForm.style.display = "none";
  const html = `<div class="footer-column">
                        <h3>Thanks for signing up for the newsletter! We'll be in touch soon.</h3>
                    </div>`;

  footerContent.insertAdjacentHTML("beforeend", html);
});
