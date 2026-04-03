document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector('.landing-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const confettiButton = document.getElementById('confettiButton');

    if (nav) {
        const links = nav.querySelectorAll('a');
        const closeMenu = () => {
            nav.classList.remove('show-menu');

            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
            }
        };

        if (navToggle) {
            navToggle.addEventListener('click', () => {
                const isOpen = nav.classList.toggle('show-menu');
                navToggle.setAttribute('aria-expanded', String(isOpen));
            });
        }

        links.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 720) {
                closeMenu();
            }
        });
    }

    if (confettiButton && typeof confetti === 'function') {
        confettiButton.addEventListener('click', function () {
            confetti({
                particleCount: 120,
                spread: 75,
                origin: { y: 0.7 }
            });
        });
    }
});
