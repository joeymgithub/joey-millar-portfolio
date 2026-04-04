document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".landing-nav");
    const navToggle = document.querySelector(".nav-toggle");
    const confettiButton = document.getElementById("confettiButton");
    let confettiLoader;

    if (nav) {
        const links = nav.querySelectorAll("a");
        const closeMenu = () => {
            nav.classList.remove("show-menu");

            if (navToggle) {
                navToggle.setAttribute("aria-expanded", "false");
            }
        };

        if (navToggle) {
            navToggle.addEventListener("click", () => {
                const isOpen = nav.classList.toggle("show-menu");
                navToggle.setAttribute("aria-expanded", String(isOpen));
            });
        }

        links.forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 720) {
                closeMenu();
            }
        });
    }

    const loadConfetti = () => {
        if (typeof window.confetti === "function") {
            return Promise.resolve(window.confetti);
        }

        if (!confettiLoader) {
            confettiLoader = new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js";
                script.async = true;
                script.onload = () => resolve(window.confetti);
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        return confettiLoader;
    };

    if (confettiButton) {
        confettiButton.addEventListener("click", async () => {
            try {
                const launchConfetti = await loadConfetti();

                if (typeof launchConfetti === "function") {
                    launchConfetti({
                        particleCount: 120,
                        spread: 75,
                        origin: { y: 0.7 },
                    });
                }
            } catch (error) {
                console.error("Unable to load confetti", error);
            }
        });
    }
});
