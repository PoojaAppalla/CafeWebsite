function resetCart() {
    // Check if cart already exists before resetting
    if (!sessionStorage.getItem('cart')) {
        sessionStorage.setItem('cart', JSON.stringify([]));
    }
}

function updateCartCount() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}



function addToCart(name, price, image) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Item added to cart');
    return false; // Prevent default link behavior
}

function removeFromCart(name) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity -= 1;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems(); // Refresh cart display
    alert('Item removed from cart');
}

document.addEventListener('DOMContentLoaded', () => {
    resetCart();
    updateCartCount();

    // Other initialization code for your page
});

function showAbout() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {

    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];


    // Clear existing content in the container
    cartItemsContainer.innerHTML = '';

    // Loop through each item in the cart and create HTML elements to display them
    cart.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'cart-card';
        itemCard.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h2>${item.name}</h2>
                <p class="price">$${item.price.toFixed(2)}</p>
                <p class="quantity">Quantity: ${item.quantity}</p>
                <button class="btn-remove-from-cart" onclick="removeFromCart('${item.name}')">Remove from Cart</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemCard);
    });
     // Clear the cart when the user leaves the page
     window.addEventListener('beforeunload', clearCartOnUnload);
    });

    function showAbout() {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    }
    
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function calculateTotal() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const zip = document.getElementById('zip').value.trim();
        
        // Regular expressions for validation
        const nameRegex = /^[A-Za-z\s]+$/;
        const phoneRegex = /^[0-9]{10}$/; // Assuming phone number is 10 digits
        const addressRegex = /^[A-Za-z0-9\s,.-]+$/; // Allows letters, numbers, spaces, commas, periods, and hyphens
        const zipRegex = /^[0-9]{5}$/; // Assuming 5-digit ZIP code
    
        if (!name || !nameRegex.test(name)) {
            alert('Please enter a valid name (letters and spaces only).');
            return;
        }
    
        if (!phone || !phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }
    
        if (!address || !addressRegex.test(address)) {
            alert('Please enter a valid address (letters, numbers, spaces, commas, periods, and hyphens only).');
            return;
        }
    
        if (!zip || !zipRegex.test(zip)) {
            alert('Please enter a valid 5-digit ZIP code.');
            return;
        }
    
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        let totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const totalWithCharge = totalPrice * 1.1; // Add 10% charge
    
        alert(`Total Price: $${totalWithCharge.toFixed(2)}\nRedirecting to Payment Method...`);
        location.href = 'payment.htm';
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        updateCartCount();
    });
    