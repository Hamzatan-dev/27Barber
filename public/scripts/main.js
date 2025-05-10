// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', function () {
    nav.classList.toggle('active');

    // Animate hamburger menu
    const spans = this.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.querySelectorAll('span').forEach(span => span.classList.remove('active'));
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Modal functionality
const modal = document.getElementById('bookingModal');
const bookNowBtn = document.getElementById('book-now-btn');
const closeModal = document.querySelector('.close-modal');

bookNowBtn.addEventListener('click', function () {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form submission handling (contact form)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.');
        this.reset();
    });
}

// Form submission handling (booking form)
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Bedankt voor je reservering! We hebben je afspraak ontvangen en sturen je een bevestiging per e-mail.');
        this.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Bedankt voor je inschrijving voor onze nieuwsbrief!');
        this.reset();
    });
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
});

// Run animation on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Firebase integratie komt later
// Deze plek is gereserveerd voor Firebase configuratie en authenticatie