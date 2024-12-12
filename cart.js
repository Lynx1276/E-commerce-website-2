  // Function to buy items (redirects to receipt page)
    function buyItems() {
      window.location.href = 'receipt.html';
    }

    // Function to display items in the cart table
    function displayCart() {
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

      let cartTable = document.getElementById('cartTable');

      // Clear previous content in the cart table
      cartTable.innerHTML = '';

      // Loop through cart items and display them in the table
      cartItems.forEach(function(item, index) {
        let row = cartTable.insertRow();

        let productNameCell = row.insertCell(0);
        productNameCell.innerHTML = item.name;

        let priceCell = row.insertCell(1);
        priceCell.innerHTML = '$' + item.price;

        let quantityCell = row.insertCell(2);
        let quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.addEventListener('change', function() {
          updateQuantity(index, this.value);
        });
        quantityCell.appendChild(quantityInput);

        let imageCell = row.insertCell(3);
        let productImage = document.createElement('img');
        productImage.src = item.image;
        productImage.className = 'product-image';
        imageCell.appendChild(productImage);

        let removeCell = row.insertCell(4);
        let removeButton = document.createElement('button');
        removeButton.innerHTML = 'Remove';
        removeButton.onclick = function() {
          removeFromCart(index);
        };
        removeCell.appendChild(removeButton);
      });
    }

    // Function to remove item from cart
    function removeFromCart(index) {
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      displayCart();
    }

    // Function to update quantity in cart
    function updateQuantity(index, newQuantity) {
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      cartItems[index].quantity = parseInt(newQuantity);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      displayCart();
    }

    // Call displayCart function when the page loads
    window.onload = displayCart;