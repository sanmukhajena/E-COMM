document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 100.0 },
    { id: 2, name: "Product 2", price: 150.0 },
    { id: 3, name: "Product 3", price: 200.0 },
  ];

  let cart = [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Display Products
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });

  // Add product to cart when button clicked
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  // Add to cart
  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
    }
  }

  // Remove from cart
 cartItems.addEventListener("click", (e) => {
   if (e.target.classList.contains("remove-btn")) {
     const index = e.target.dataset.index;
     cart.splice(index, 1);
     renderCart();
   }
 });


  // Checkout
  checkoutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      alert(
        `Checkout successful! Total amount: ${totalPriceDisplay.textContent}`
      );
      cart = []; // Clear cart
      renderCart();
    } else {
      alert("Your cart is empty!");
    }
  });
});
