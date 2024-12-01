// Scripts for PetPlaza website

// Console Warning
console.warn(
    "STOP! THIS IS A WARNING, COPYING ANYTHING FROM HERE, AND GIVING IT TO ANYONE, GIVES ANYONE ACCESS TO YOUR PETPLAZA ACCOUNT."
);

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic Active Navigation Highlight
document.querySelectorAll('nav a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Newsletter Form Validation
document.querySelector('form')?.addEventListener('submit', function (e) {
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput && !emailInput.value.includes('@')) {
        e.preventDefault();
        alert('Please enter a valid email address.');
    }
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.textContent = "⬆";
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: none;
    background: #FFA500;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 18px;
    cursor: pointer;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dynamic Footer Year
document.querySelector('footer').innerHTML += `
    <p>&copy; ${new Date().getFullYear()} PetPlaza. All rights reserved.</p>
`;

// Testimonial Carousel (if you have multiple testimonials)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const testimonialCount = testimonials.length;

function showNextTestimonial() {
    testimonials[currentTestimonial]?.classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonialCount;
    testimonials[currentTestimonial]?.classList.add('active');
}

// Cart Functionality
let cart = [];
function toggleCart() {
    const cartPanel = document.getElementById('cart-overlay');
    if (cartPanel.classList.contains('active')) {
        cartPanel.classList.remove('active');
    } else {
        cartPanel.classList.add('active');
    }
}

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = cart.length
        ? cart.map(item => `<p>${item.name} - $${item.price.toFixed(2)}</p>`).join('')
        : '<p>Your cart is empty!</p>';
    document.getElementById('cart-count').textContent = cart.length;
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    alert('Proceeding to checkout...');
    cart = [];
    updateCartUI();
    document.getElementById('cart-count').textContent = '0';
}

// Balance Functionality
let balance = 0.00; // Default balance

function updateBalanceDisplay() {
    document.getElementById('balance').textContent = balance.toFixed(2);
}

function topUp() {
    location.href = '/topup'; // Redirect to GameMoney integration
}

// Initialize balance display
updateBalanceDisplay();
