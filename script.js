"use strict";

import products from "./products.js";
import reviews from "./reviews.js";

// Global variables
let cartItems = [];
let totalPrice = 0;
let cartItemsCount = 0;
let subscribedEmails = [];

// DOM elements
const bagPrice = document.querySelector(".bag-price");
const badgeNumber = document.querySelector(".badge");
const checkoutTotal = document.querySelector(".checkout-total");
const notification = document.getElementById("notification");

const searchButton = document.getElementById("searchBtn");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const bagButton = document.querySelector(".shopping-bag");
const closeButton = document.querySelector(".close-cart-btn");

const inputSearch = document.querySelector("#searchInput");
const inputSubscribe = document.querySelector(".input-field-subscribe");

const productsSection = document.querySelector(".product-showcase");
const productsContainer = document.querySelector(".product-grid");
const reviewsContainer = document.querySelector(".reviews-container");
const cartContainer = document.querySelector(".cart-container");
const cartItemsContainer = document.querySelector(".cart-items");
const footerContent = document.querySelector(".footer-content");
const subscribeForm = document.querySelector(".subscribe-form");

// Functions

const renderProducts = () => {
  products.forEach((product) => {
    const html = `
                <div class="product">
                    <img src=${product.imgPath} alt="Product 1" />
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="price">$${product.price}</span>
                    <button class="add-to-cart">Add to Cart</button>
              </div>
        `;
    productsContainer.insertAdjacentHTML("beforeend", html);
  });
};

const renderReviews = () => {
  reviews.forEach((rev) => {
    const html = `
                <div class="review">
                <i class="fa-solid fa-quote-left quote-icon"></i>
                <p>${rev.review}</p>
                <h3>${rev.reviewer}</h3>
            </div>
          `;
    reviewsContainer.insertAdjacentHTML("beforeend", html);
  });
};

renderProducts();
renderReviews();

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

const showNotification = () => {
  notification.style.display = "block";
  setTimeout(function () {
    hideNotification();
  }, 1500);
};

const hideNotification = () => {
  notification.style.display = "none";
};

function searchFunction() {
  let input, filter, products, title, description;
  input = document.getElementById("searchInput");
  filter = input.value.toLowerCase().replace(/\s/g, "");
  products = document.querySelectorAll(".product");

  products.forEach((product) => {
    title = product.getElementsByTagName("h3")[0];
    description = product.getElementsByTagName("p")[0];

    if (
      title.innerText.toLowerCase().indexOf(filter) > -1 ||
      description.innerText.toLowerCase().indexOf(filter) > -1
    ) {
      product.style.display = "";
    } else {
      product.style.display = "none";
    }
  });

  productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

const showCart = (e) => {
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
};

const subscribeEmail = (e) => {
  e.preventDefault();

  const emailInput = document.querySelector(".input-field-subscribe");
  const email = emailInput.value;

  subscribedEmails.push(email);
  subscribeForm.style.display = "none";
  const html = `<div class="footer-column">
                          <h3>Thanks for signing up for the newsletter! We'll be in touch soon.</h3>
                      </div>`;

  footerContent.insertAdjacentHTML("beforeend", html);
};

// Event Listeners

// Search
searchButton.addEventListener("click", searchFunction);
inputSearch.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchFunction();
  }
});

// Add to cart
productsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    addToCart(e);
    showNotification();
  }
});

// Show cart
bagButton.addEventListener("click", showCart);

// Close cart
closeButton.addEventListener("click", function () {
  cartContainer.style.right = "-300px";
});

document.body.addEventListener("click", (e) => {
  if (!cartContainer.contains(e.target) && e.target !== bagButton) {
    cartContainer.style.right = "-300px";
  }
});

// Subscription

subscribeForm.addEventListener("submit", subscribeEmail);
