// MOBILE NAVIGATION TOGGLE
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const header = document.getElementById("header");

function closeMenu() {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// CLOSE MENU WHEN CLICKING A LINK OR OUTSIDE THE HEADER
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("click", function (event) {
    if (!header.contains(event.target) && navLinks.classList.contains("active")) {
        closeMenu();
    }
});

// HIGHLIGHT ACTIVE NAVIGATION LINK ON SCROLL
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");
                navItems.forEach(function (link) {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${currentId}`
                    );
                });
            }
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach(function (section) {
    sectionObserver.observe(section);
});

// SMOOTH SCROLL-REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(function (el) {
    revealObserver.observe(el);
});

// SEND CONTACT FORM MESSAGES DIRECTLY TO EMAIL WITHOUT LEAVING THE PAGE
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

if (contactForm && submitBtn && formStatus) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        submitBtn.textContent = "Sending Message...";
        submitBtn.disabled = true;
        formStatus.className = "form-status";
        formStatus.textContent = "";

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(
                "https://formsubmit.co/ajax/ngobeniannaraesibe@gmail.com",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json"
                    },
                    body: formData
                }
            );

            if (response.ok) {
                formStatus.textContent =
                    "Thank you! Your message has been sent to Anna Ngobeni.";
                formStatus.classList.add("success");
                contactForm.reset();
            } else {
                throw new Error("Form submission failed");
            }
        } catch (error) {
            formStatus.textContent =
                "Something went wrong. Please email ngobeniannaraesibe@gmail.com directly.";
            formStatus.classList.add("error");
        } finally {
            submitBtn.textContent = "Send Email Inquiry →";
            submitBtn.disabled = false;
        }
    });
}

// AUTOMATIC COPYRIGHT YEAR
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
