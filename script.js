document.addEventListener('DOMContentLoaded', function() {

    // --- Smart Scrolling for Navbar links (Existing Code) ---
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (!href.startsWith('#') && href.includes('.html')) {
                return;
            }

            if (href.startsWith('index.html#')) {
                if (!window.location.pathname.endsWith('/') && !window.location.pathname.endsWith('index.html')) {
                    return;
                }
            }

            const targetId = this.hash;
            if (targetId) {
                e.preventDefault(); 
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Fade-in sections on scroll (Existing Code) ---
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

    // --- NEW CODE: AJAX Contact Form Submission ---
    const form = document.getElementById('contact-form');
    
    async function handleSubmit(event) {
        event.preventDefault(); // This stops the redirect
        const status = document.getElementById('form-status');
        const data = new FormData(event.target);
        const button = form.querySelector('button');

        // Disable button and show "Sending"
        button.disabled = true;
        status.innerHTML = "Sending...";
        status.className = 'sending';

        try {
            const response = await fetch(event.target.action, {
                method: event.target.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success!
                status.innerHTML = "Thanks! Your message has been sent.";
                status.className = 'success';
                form.reset();
                button.disabled = false;
            } else {
                // Server error
                status.innerHTML = "Oops! There was a problem.";
                status.className = 'error';
                button.disabled = false;
            }
        } catch (error) {
            // Network error
            status.innerHTML = "Oops! There was a network error.";
            status.className = 'error';
            button.disabled = false;
        }
    }

    // Only add the listener if the form exists on this page
    if (form) {
        form.addEventListener("submit", handleSubmit);
    }

}); // --- End of DOMContentLoaded ---
