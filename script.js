// "use strict";

// Global variables
let cartItems = [];
let totalPrice = 0;
let cartItemsCount = 0;
let subscribedEmails = [];

const products = [
  {
    id: 1,
    name: "Birdnest Japanese",
    description: "Air purifying",
    price: 84.9,
    imgPath: "./images/plant1.jpg",
  },
  {
    id: 2,
    name: "Hoya Obovatum",
    description: "Indoor Plants",
    price: 64.0,
    imgPath: "./images/plant2.jpg",
  },
  {
    id: 3,
    name: "Monstera Deliciosa",
    description: "Air purifying",
    price: 224.9,
    imgPath: "./images/plant3.jpg",
  },
  {
    id: 4,
    name: "Zz Plants",
    description: "Herbs seeds",
    price: 124.9,
    imgPath: "./images/plant4.jpg",
  },
  {
    id: 5,
    name: "Bird of Paradise",
    description: "Ceramic pots",
    price: 249.9,
    imgPath: "./images/plant5.jpg",
  },
  {
    id: 6,
    name: "Calathea Beauty Star",
    description: "Herbs seeds",
    price: 79.9,
    imgPath: "./images/plant6.jpg",
  },
];

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

const productsContainer = document.querySelector(".product-grid");
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

renderProducts();

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
productsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    addToCart(event);
  }
});

// Show cart
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
