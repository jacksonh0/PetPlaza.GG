// Shopping Page Script
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.dataset.itemName;
        const itemPrice = button.dataset.itemPrice;

        // Simulate adding to cart
        alert(`${itemName} has been added to your cart! Price: ${itemPrice}`);
    });
});

// Dynamic Cart Icon Update (for future expansion)
let cartCount = 0;

function updateCartCount() {
    const cartIcon = document.querySelector('#cart-icon');
    if (cartIcon) {
        cartCount++;
        cartIcon.textContent = cartCount;
    }
}
