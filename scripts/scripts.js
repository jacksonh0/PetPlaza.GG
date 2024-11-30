// Scripts for PetPlaza website

// Klaviyo Script Integration
<script async type='text/javascript' src='https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=RffM7A'></script>

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
document.querySelector('form').addEventListener('submit', function (e) {
    const emailInput = document.querySelector('input[type="email"]');
    if (!emailInput.value.includes('@')) {
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
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonialCount;
    testimonials[currentTestimonial].classList.add('active');
}

setInterval(showNextTestimonial, 5000); // Change every 5 seconds

