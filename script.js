document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling for Navbar links ---
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Fade-in sections on scroll ---
    const sections = document.querySelectorAll('.section');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the section is intersecting the viewport, add the 'visible' class
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});