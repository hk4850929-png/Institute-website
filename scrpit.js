// ==========================================================================
// DAY 19 JAVASCRIPT LOGIC (Navigation & Smooth Scrolling)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu li a");

    // Toggle hamburger menu
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Close menu when a link is clicked (Requirement 3)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (hamburger.classList.contains("active")) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    });

    // Optional: Intersection Observer for scroll fade-in animations (Requirement 11)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}s`;
                entry.target.classList.add('fade-in-active');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });
});
