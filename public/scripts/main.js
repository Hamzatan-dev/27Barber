// --- UI Functionaliteit ---

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuToggle.addEventListener('click', function () {
    nav.classList.toggle('active');
    this.querySelectorAll('span').forEach(span => span.classList.toggle('active'));
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
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

// Modal functionality (booking)
const bookNowBtn = document.getElementById('book-now-btn');
if (bookNowBtn) {
    bookNowBtn.addEventListener('click', function () {
        if (!auth.currentUser) {
            // Niet ingelogd: toon login modal
            loginModal.style.display = "flex";
            loginTab.classList.add("active");
            registerTab.classList.remove("active");
            loginContent.style.display = "block";
            registerContent.style.display = "none";
        } else {
            // Wel ingelogd: open het echte boekingsformulier/modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.');
        this.reset();
    });
}

// Animation on scroll
function animateOnScroll() {
    document.querySelectorAll('.fade-in').forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}
document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
});
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// --- Firebase Authentication ---

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDt1ZL9aDYoBT9-sPBhn0UHMYzTLe8eCug",
    authDomain: "barberdb-2025.firebaseapp.com",
    projectId: "barberdb-2025",
    storageBucket: "barberdb-2025.firebasestorage.app",
    messagingSenderId: "108970799183",
    appId: "1:108970799183:web:2a669bb5fe2f3e16c4ba3a",
    measurementId: "G-SRGWD6Q8TB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Modal elementen
const userMenuContainer = document.getElementById('user-menu-container');
const loginModal = document.getElementById("loginModal");
const closeLoginModal = document.querySelector("#loginModal .close-modal");
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const loginContent = document.getElementById("login-content");
const registerContent = document.getElementById("register-content");

// Toon gebruikersnaam of login-icon afhankelijk van loginstatus
function renderUserMenu(user) {
    if (user) {
        const name = user.displayName || user.email.split('@')[0];
        userMenuContainer.innerHTML = `
            <span class="user-name">${name}</span>
            <button id="logout-btn" class="logout-btn">Afmelden</button>
        `;
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth);
        });
    } else {
        userMenuContainer.innerHTML = `
            <a href="#" id="login-icon"><i class="fas fa-user"></i></a>
        `;
        const loginIcon = document.getElementById("login-icon");
        loginIcon.addEventListener("click", () => {
            loginModal.style.display = "flex";
            loginTab.classList.add("active");
            registerTab.classList.remove("active");
            loginContent.style.display = "block";
            registerContent.style.display = "none";
        });
    }
}

// Tabs functionaliteit
loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginContent.style.display = "block";
    registerContent.style.display = "none";
    document.getElementById("register-success").style.display = "none";
});

registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerContent.style.display = "block";
    loginContent.style.display = "none";
    document.getElementById("register-success").style.display = "none";
});

// Helper om alle login/register velden te resetten
function resetAuthForms() {
    if (loginForm) loginForm.reset();
    if (registerForm) registerForm.reset();
}

// Auth status listener
onAuthStateChanged(auth, (user) => {
    renderUserMenu(user);
    if (user) {
        loginModal.style.display = "none";
        resetAuthForms();
    }
});

closeLoginModal.addEventListener("click", () => {
    loginModal.style.display = "none";
    resetAuthForms();
});

// Inloggen
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("login-error");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        loginError.style.display = "none";
        loginError.textContent = "";
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("password").value;
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                resetAuthForms();
            })
            .catch((error) => {
                loginError.textContent = "Fout bij inloggen: " + error.message;
                loginError.style.display = "block";
            });
    });
}

// Registreren
const registerForm = document.getElementById("registerForm");
const registerError = document.getElementById("register-error");
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        registerError.style.display = "none";
        registerError.textContent = "";
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return updateProfile(userCredential.user, { displayName: name }).then(() => userCredential.user);
            })
            .then(async (user) => {
                await auth.currentUser.reload();
                renderUserMenu(auth.currentUser);
                loginModal.style.display = "none";
                resetAuthForms();
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    registerError.textContent = "Dit e-mailadres is al in gebruik.";
                } else {
                    registerError.textContent = "Fout bij registreren: " + error.message;
                }
                registerError.style.display = "block";
            });
    });
}

// Bij sluiten modal ook foutmeldingen wissen
closeLoginModal.addEventListener("click", () => {
    loginModal.style.display = "none";
    resetAuthForms();
    if (loginError) { loginError.style.display = "none"; loginError.textContent = ""; }
    if (registerError) { registerError.style.display = "none"; registerError.textContent = ""; }
});

// --- Banner slider functionality ---
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

// --- Booking functionality ---
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
const db = getFirestore(app);

const bookingModal = document.getElementById('bookingModal');
const closeBookingModal = document.getElementById('closeBookingModal');
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('booking-success');
const bookingBarber = document.getElementById("booking-barber");
const bookingService = document.getElementById("booking-service");
const bookingDate = document.getElementById("booking-date");
const bookingTime = document.getElementById("booking-time");
const bookingNotes = document.getElementById("booking-notes");

// --- Openingstijden per dag (0=Zondag, 1=Maandag, ..., 6=Zaterdag) ---
const openingHours = {
    0: { open: "10:00", close: "17:00" }, // Zondag
    1: { open: "11:00", close: "19:00" }, // Maandag
    2: null, // Dinsdag gesloten
    3: null, // Woensdag gesloten
    4: { open: "10:00", close: "19:00" }, // Donderdag
    5: { open: "10:00", close: "19:00" }, // Vrijdag
    6: { open: "10:00", close: "19:00" }, // Zaterdag
};

// Helper: Genereer tijdslots per half uur tussen open en sluit
function generateTimeSlots(open, close) {
    const slots = [];
    let [h, m] = open.split(":").map(Number);
    const [endH, endM] = close.split(":").map(Number);
    while (h < endH || (h === endH && m < endM)) {
        const slot = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
        slots.push(slot);
        m += 30;
        if (m >= 60) { h++; m = 0; }
    }
    return slots;
}

// --- Stapsgewijze activatie van velden ---
function resetBookingFormState() {
    bookingBarber.value = "";
    bookingService.value = "";
    bookingDate.value = "";
    bookingTime.value = "";
    bookingNotes.value = "";
    bookingService.disabled = true;
    bookingDate.disabled = true;
    bookingTime.disabled = true;
}

if (bookingBarber) {
    bookingBarber.addEventListener("change", function () {
        bookingService.disabled = !bookingBarber.value;
        bookingDate.disabled = true;
        bookingTime.disabled = true;
        bookingService.value = "";
        bookingDate.value = "";
        bookingTime.value = "";
    });
}
if (bookingService) {
    bookingService.addEventListener("change", function () {
        bookingDate.disabled = !bookingService.value;
        bookingTime.disabled = true;
        bookingDate.value = "";
        bookingTime.value = "";
    });
}
if (bookingDate) {
    bookingDate.addEventListener("change", function () {
        bookingTime.disabled = !bookingDate.value;
        bookingTime.value = "";
        updateTimeSlots();
    });
}

// --- Datum validatie: alleen open dagen selecteerbaar ---
if (bookingDate) {
    bookingDate.setAttribute("min", new Date().toISOString().split("T")[0]);
    bookingDate.addEventListener("input", function () {
        const [year, month, dayNum] = this.value.split("-");
        const date = new Date(year, month - 1, dayNum);
        const day = date.getDay();
        if (!openingHours[day]) {
            this.setCustomValidity("Deze dag zijn we gesloten.");
        } else {
            this.setCustomValidity("");
        }
    });
}

// --- Vul tijdslots op basis van gekozen dag en beschikbaarheid ---
async function updateTimeSlots() {
    bookingTime.innerHTML = '<option value="">Kies een tijd</option>';
    const barber = bookingBarber.value;
    const dateStr = bookingDate.value;
    if (!barber || !dateStr) return;

    // Gebruik lokale datum parsing
    const [year, month, dayNum] = dateStr.split("-");
    const date = new Date(year, month - 1, dayNum);
    const day = date.getDay();
    const hours = openingHours[day];
    if (!hours) return; // Gesloten

    const slots = generateTimeSlots(hours.open, hours.close);

    // Haal bestaande afspraken op voor deze kapper en datum
    const q = query(
        collection(db, "appointments"),
        where("barber", "==", barber),
        where("date", "==", dateStr)
    );
    const querySnapshot = await getDocs(q);
    const takenTimes = [];
    querySnapshot.forEach(doc => takenTimes.push(doc.data().time));

    slots.forEach(slot => {
        if (!takenTimes.includes(slot)) {
            const option = document.createElement("option");
            option.value = slot;
            option.textContent = slot;
            bookingTime.appendChild(option);
        }
    });
}

// --- Alleen open dagen selecteerbaar in de datepicker ---
if (bookingDate) {
    bookingDate.addEventListener("keydown", e => e.preventDefault()); // voorkom handmatig typen
}

// Optioneel: verberg tijdslot-selectie als dag gesloten is
if (bookingDate) {
    bookingDate.addEventListener("change", function () {
        const [year, month, dayNum] = this.value.split("-");
        const date = new Date(year, month - 1, dayNum);
        const day = date.getDay();
        if (!openingHours[day]) {
            bookingTime.innerHTML = '<option value="">Gesloten</option>';
        }
    });
}

// Bij openen modal: reset en activeer alleen eerste veld
if (bookNowBtn) {
    bookNowBtn.addEventListener('click', function () {
        if (!auth.currentUser) {
            // Niet ingelogd: toon login modal
            loginModal.style.display = "flex";
            loginTab.classList.add("active");
            registerTab.classList.remove("active");
            loginContent.style.display = "block";
            registerContent.style.display = "none";
        } else {
            // Wel ingelogd: open het boekingsformulier/modal
            bookingModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            resetBookingFormState();
            bookingBarber.disabled = false;
            bookingSuccess.style.display = 'none';
            bookingTime.innerHTML = '<option value="">Kies een tijd</option>';
        }
    });
}

if (closeBookingModal) {
    closeBookingModal.addEventListener('click', () => {
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetBookingFormState();
        bookingSuccess.style.display = 'none';
        bookingTime.innerHTML = '<option value="">Kies een tijd</option>';
    });
}

if (bookingForm) {
    bookingForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user) return;

        // Controleer of tijdslot nog vrij is (dubbele check)
        const q = query(
            collection(db, "appointments"),
            where("barber", "==", bookingBarber.value),
            where("date", "==", bookingDate.value),
            where("time", "==", bookingTime.value)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            bookingSuccess.style.display = 'block';
            bookingSuccess.style.color = 'red';
            bookingSuccess.textContent = "Dit tijdslot is net geboekt. Kies een ander tijdstip.";
            return;
        }

        await addDoc(collection(db, "appointments"), {
            userId: user.uid,
            userName: user.displayName || "",
            barber: bookingBarber.value,
            service: bookingService.value,
            date: bookingDate.value,
            time: bookingTime.value,
            notes: bookingNotes.value,
            created: new Date()
        });

        bookingSuccess.style.display = 'block';
        bookingSuccess.style.color = 'goldenrod';
        bookingSuccess.textContent = "Je afspraak is succesvol geboekt!";
        resetBookingFormState();
        bookingTime.innerHTML = '<option value="">Kies een tijd</option>';
        setTimeout(() => {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            bookingSuccess.style.display = 'none';
        }, 2000);
    });
}