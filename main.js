// Function to buy items (redirects to receipt page)
   function buyItems() {
      window.location.href = 'receipt.html';
   }



//Select//

document.getElementById('category').addEventListener('change', function() {
    var selectedSectionId = this.value;
    var selectedSection = document.getElementById(selectedSectionId);
    if (selectedSection) {
      selectedSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  
  //Input search//
  
  document.getElementById('search').addEventListener('input', function() {
  let searchTerm = this.value.trim().toLowerCase();
  let section = document.querySelectorAll('.shoe, .t-shirt, .dress');

  section.forEach(section => {
    let sectionHasMatches = false;

    section.querySelectorAll('.container').forEach(container => {
      let itemName = container.querySelector('h2').innerText.toLowerCase(); // Replace '.item-name' with your item name class or identifier

      if (itemName.includes(searchTerm)) {
        container.style.display = 'block'; // Show the matched item
        sectionHasMatches = true; // Set flag to true if at least one item matches
      } else {
        container.style.display = 'none'; // Hide non-matching items
      }
    });

    if (sectionHasMatches) {
      section.style.display = 'block'; // Show the section if it has matching items
    } else {
      section.style.display = 'none'; // Hide the section if no matching items found
    }
  });
});


  // Function to add items to the cart
    function addToCart(productName, price, image) {
      // Get the cart items from local storage or initialize as an empty array
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if the item is already in the cart
      let found = false;
      cartItems.forEach(function(item) {
        if (item.name === productName) {
          item.quantity++;
          found = true;
        }
      });

      if (!found) {
        // Add the new item to the cart with quantity as 1
        cartItems.push({ name: productName, price: price, quantity: 1, image: image });
      }

      // Update the cart items in local storage
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }