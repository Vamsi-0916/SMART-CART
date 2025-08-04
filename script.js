let currentCart = "Cart";
let carts = {
  Cart: [],
  Wishlist: []
};

function loadCart() {
  const data = localStorage.getItem("smartCartData");
  if (data) {
    carts = JSON.parse(data);
  }
  renderItems();
}

function saveCart() {
  localStorage.setItem("smartCartData", JSON.stringify(carts));
}

function switchCart(cartName) {
  currentCart = cartName;
  document.getElementById("currentCart").innerText = cartName;
  renderItems();
}

function renderItems() {
  const list = document.getElementById("itemList");
  list.innerHTML = "";
  let total = 0;

  carts[currentCart].forEach((item, index) => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = `${item.name} × ${item.qty} - ₹${item.price * item.qty}`;
    li.appendChild(text);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Remove";
    delBtn.onclick = () => {
      carts[currentCart].splice(index, 1);
      saveCart();
      renderItems();
    };
    li.appendChild(delBtn);

    list.appendChild(li);
    total += item.price * item.qty;
  });

  document.getElementById("totalPrice").textContent = `Total: ₹${total}`;
}

document.getElementById("itemForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("itemName").value.trim();
  const price = parseFloat(document.getElementById("itemPrice").value);
  const qty = parseInt(document.getElementById("itemQty").value);

  if (!name || isNaN(price) || isNaN(qty)) return;

  carts[currentCart].push({ name, price, qty });
  saveCart();
  renderItems();

  this.reset();
});

loadCart();
