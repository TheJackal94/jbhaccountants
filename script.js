document.addEventListener('DOMContentLoaded', function() {

    // --- Smart Scrolling for Navbar links (Updated) ---
    // This new code handles both same-page and cross-page links.
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Check if it's a link to another page (like 'resources.html')
            if (!href.startsWith('#') && href.includes('.html')) {
                // Let the browser handle the navigation normally
                return;
            }

            // Check if it's a link to a section on the homepage
            if (href.startsWith('index.html#')) {
                // If we are NOT on the homepage, let the browser navigate
                if (!window.location.pathname.endsWith('/') && !window.location.pathname.endsWith('index.html')) {
                    return;
                }
            }

            // If we are on the homepage and the link is a hash, smooth scroll
            const targetId = this.hash;
            if (targetId) {
                e.preventDefault(); // Prevent default jump
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Fade-in sections on scroll (No changes needed here) ---
    const sections = document.querySelectorAll('.section');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});