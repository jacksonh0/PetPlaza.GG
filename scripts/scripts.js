// Scripts for PetPlaza website

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
function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    if (cartPanel.classList.contains('hidden')) {
        cartPanel.classList.remove('hidden');
        cartPanel.style.transform = 'translateX(0)';
    } else {
        cartPanel.classList.add('hidden');
        cartPanel.style.transform = 'translateX(100%)';
    }
}

let cart = [];
function addToCart(item) {
    cart.push(item);
    document.getElementById('cart-count').textContent = cart.length;
    renderCartItems();
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = cart.length
        ? cart.map(item => `<li>${item.name} - $${item.price}</li>`).join('')
        : '<li>No items in cart.</li>';
}

function checkout() {
    alert('Proceeding to checkout...');
    cart = [];
    renderCartItems();
    document.getElementById('cart-count').textContent = '0';
}

// Balance Functionality
let balance = 50.00; // Default balance

function toggleBalance() {
    const balancePanel = document.getElementById('balance-panel');
    balancePanel.style.display =
        balancePanel.style.display === 'block' ? 'none' : 'block';
}

function topUp() {
    const amount = parseFloat(prompt('Enter amount to top up:'));
    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;
        alert(`Balance topped up successfully! New balance: $${balance.toFixed(2)}`);
    } else {
        alert('Invalid amount. Please try again.');
    }
}
