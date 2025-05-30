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


// Firebase Authentication

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDt1ZL9aDYoBT9-sPBhn0UHMYzTLe8eCug",
    authDomain: "barberdb-2025.firebaseapp.com",
    projectId: "barberdb-2025",
    storageBucket: "barberdb-2025.firebasestorage.app",
    messagingSenderId: "108970799183",
    appId: "1:108970799183:web:2a669bb5fe2f3e16c4ba3a",
    measurementId: "G-SRGWD6Q8TB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login Modal openen/sluiten
const loginIcon = document.getElementById("login-icon");
const loginModal = document.getElementById("loginModal");
const closeLoginModal = document.querySelector("#loginModal .close-modal");

loginIcon.addEventListener("click", () => {
    loginModal.style.display = "flex";

    // Zorg ervoor dat de tab "Inloggen" actief is en zichtbaar
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginContent.style.display = "block";
    registerContent.style.display = "none";
});

closeLoginModal.addEventListener("click", () => {
    loginModal.style.display = "none";
});

// Inloggen met Firebase
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Inloggen geslaagd
            const user = userCredential.user;
            alert(`Welkom, ${user.email}`);
            loginModal.style.display = "none";
        })
        .catch((error) => {
            // Foutmelding weergeven
            alert("Fout bij inloggen: " + error.message);
        });
});

// Tabs in de modal
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const loginContent = document.getElementById("login-content");
const registerContent = document.getElementById("register-content");

loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginContent.style.display = "block";
    registerContent.style.display = "none";
});

registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerContent.style.display = "block";
    loginContent.style.display = "none";
});

// Registreren met Firebase
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registratie geslaagd
            const user = userCredential.user;
            alert(`Welkom, ${name}! Je account is aangemaakt.`);
            loginModal.style.display = "none";
        })
        .catch((error) => {
            // Foutmelding weergeven
            alert("Fout bij registreren: " + error.message);
        });
});

// Banner slider functionality
document.querySelectorAll('.banner-track').forEach(track => {
    const word = '27Barbershop';
    let repeated = '';
    let count = 0;
    const total = 20;

    while (count < total) {
        const colorClass = count % 2 === 0 ? 'barber-red' : 'barber-blue';
        repeated += `<span class="banner-text ${colorClass}">${word}</span>`;
        if (count < total - 1) repeated += ' ';
        count++;
    }

    track.querySelectorAll('.banner-loop').forEach(loop => loop.innerHTML = repeated);
});