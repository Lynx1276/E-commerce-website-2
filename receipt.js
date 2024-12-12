 // Function to display receipt
    function displayReceipt() {
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      let receiptTable = document.getElementById('receiptTable');
      let totalAmount = 0;

      // Clear previous content in the receipt table
      receiptTable.innerHTML = '';

      // Loop through cart items and display them in the receipt table
      cartItems.forEach(function(item, index) {
        let row = receiptTable.insertRow();

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

        let totalCell = row.insertCell(4);
        let totalPrice = item.price * item.quantity;
        totalCell.innerHTML = '$' + totalPrice;

        totalAmount += totalPrice;
      });

      // Display total amount
      let row = receiptTable.insertRow();
      let totalLabelCell = row.insertCell(0);
      totalLabelCell.colSpan = 3;
      totalLabelCell.style.textAlign = 'right';
      totalLabelCell.innerHTML = '<strong>Total:</strong>';

      let totalAmountCell = row.insertCell(1);
      totalAmountCell.innerHTML = '$' + totalAmount;
    }

    // Function to update quantity in cart
    function updateQuantity(index, newQuantity) {
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      cartItems[index].quantity = parseInt(newQuantity);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      displayReceipt();
    }

    // Function to clear receipt content
    function clearReceipt() {
      localStorage.removeItem('cart');
      let receiptTable = document.getElementById('receiptTable');
      receiptTable.innerHTML = '';
    }

    // Call displayReceipt function when the page loads
    window.onload = displayReceipt;