const products = [
  {
  id: 5,
  name: "Portable Charger",
  price: 899,
  image: "https://via.placeholder.com/200x150.png?text=Charger"
  },
  {
    id: 6,
    name: "USB-C Cable",
    price: 299,
    image: "https://via.placeholder.com/200x150.png?text=USB-C+Cable"
  },
  {
    id: 7,
    name: "Noise Cancelling Earbuds",
    price: 1599,
    image: "https://via.placeholder.com/200x150.png?text=Earbuds"
  },
  {
    id: 8,
    name: "Laptop Bag",
    price: 1199,
    image: "https://via.placeholder.com/200x150.png?text=Laptop+Bag"
  },
  {
    id: 9,
    name: "Mechanical Keyboard",
    price: 3499,
    image: "https://via.placeholder.com/200x150.png?text=Keyboard"
  },
  {
    id: 10,
    name: "LED Desk Lamp",
    price: 699,
    image: "https://via.placeholder.com/200x150.png?text=Desk+Lamp"
  },
  {
    id: 11,
    name: "External Hard Drive",
    price: 4999,
    image: "https://via.placeholder.com/200x150.png?text=Hard+Drive"
  },
  {
    id: 12,
    name: "Fitness Tracker",
    price: 2799,
    image: "https://via.placeholder.com/200x150.png?text=Fitness+Tracker"
  },
  {
    id: 13,
    name: "Wireless Charger",
    price: 1099,
    image: "https://via.placeholder.com/200x150.png?text=Wireless+Charger"
  },
  {
    id: 14,
    name: "Bluetooth Speaker",
    price: 1899,
    image: "https://via.placeholder.com/200x150.png?text=Speaker"
  },

  {
    id: 1,
    name: "Bluetooth Headphones",
    price: 1299,
    image: "https://via.placeholder.com/200x150.png?text=Headphones"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    image: "https://via.placeholder.com/200x150.png?text=Smart+Watch"
  },
  {
    id: 3,
    name: "Wireless Mouse",
    price: 599,
    image: "https://via.placeholder.com/200x150.png?text=Mouse"
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 999,
    image: "https://via.placeholder.com/200x150.png?text=Laptop+Stand"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const wishlistList = document.getElementById("wishlist");

function saveData() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function searchProducts() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  renderProducts(filtered);
}

function clearSearch() {
  document.getElementById("searchInput").value = "";
  renderProducts();
}


function renderLists() {
  cartList.innerHTML = "";
  wishlistList.innerHTML = "";

  let cartTotal = 0;
  let wishlistTotal = 0;

  cart.forEach(item => {
    const quantity = item.quantity || 1;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x ${quantity} - ₹${item.price * quantity}
      <button onclick="removeFromCart(${item.id})">❌ Remove</button>
    `;
    cartList.appendChild(li);
    cartTotal += item.price * quantity;
  });

  wishlist.forEach(item => {
    const quantity = item.quantity || 1;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x ${quantity} - ₹${item.price * quantity}
      <button onclick="removeFromWishlist(${item.id})">❌ Remove</button>
    `;
    wishlistList.appendChild(li);
    wishlistTotal += item.price * quantity;
  });

  // Add totals
  const cartTotalEl = document.createElement("li");
  cartTotalEl.style.fontWeight = "bold";
  cartTotalEl.textContent = `Total: ₹${cartTotal}`;
  cartList.appendChild(cartTotalEl);

  const wishlistTotalEl = document.createElement("li");
  wishlistTotalEl.style.fontWeight = "bold";
  wishlistTotalEl.textContent = `Total: ₹${wishlistTotal}`;
  wishlistList.appendChild(wishlistTotalEl);
}

function renderProducts(filteredProducts = products) {
  productList.innerHTML = "";

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button onclick="addToWishlist(${product.id})">Add to Wishlist</button>
    `;

    productList.appendChild(card);
  });
}


function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveData();
  renderLists();
}

function addToWishlist(id) {
  const product = products.find(p => p.id === id);
  const existing = wishlist.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    wishlist.push({ ...product, quantity: 1 });
  }

  saveData();
  renderLists();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveData();
  renderLists();
}

function removeFromWishlist(id) {
  wishlist = wishlist.filter(item => item.id !== id);
  saveData();
  renderLists();
}

// Initial render
renderProducts();
renderLists();