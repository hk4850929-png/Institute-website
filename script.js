// ================================
// MOBILE MENU
// ================================

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

if (menu && nav) {

    menu.addEventListener("click", () => {

        nav.classList.toggle("active");

        if (nav.classList.contains("active")) {

            menu.innerHTML = '<i class="fa-solid fa-xmark"></i>';

        } else {

            menu.innerHTML = '<i class="fa-solid fa-bars"></i>';

        }

    });

}

// ================================
// STICKY HEADER SHADOW
// ================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.15)";

    } else {

        header.style.boxShadow = "0 8px 20px rgba(0,0,0,.08)";

    }

});

// ================================
// SMOOTH SCROLL
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ================================
// CARD ANIMATION
// ================================

const cards = document.querySelectorAll(".card,.course-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.2

});

cards.forEach(card => {

    observer.observe(card);

});

// ================================
// HERO FADE ANIMATION
// ================================

window.addEventListener("load", () => {

    const heroContent = document.querySelector(".hero-content");

    const heroImage = document.querySelector(".hero-image");

    if (heroContent) {

        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateX(0)";

    }

    if (heroImage) {

        heroImage.style.opacity = "1";
        heroImage.style.transform = "translateX(0)";

    }

});
