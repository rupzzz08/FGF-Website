"use strict";

console.log("FGF JavaScript loaded");

// MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
        mainNav.classList.toggle("active");
        menuToggle.classList.toggle("active");

        const isOpen = mainNav.classList.contains("active");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

// MANUAL SMOOTH SCROLL
function smoothScrollTo(targetPosition, duration = 900) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }

        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Smooth ease-in-out effect
        const easing =
            progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(
            0,
            startPosition + distance * easing
        );

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// ALL INTERNAL LINKS
const scrollLinks = document.querySelectorAll(
    '.main-nav a, .hero-button, .training-card a, .pt-button'
);

scrollLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (
            targetId &&
            targetId.startsWith("#") &&
            targetId !== "#"
        ) {
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                event.preventDefault();

                const header = document.querySelector(".site-header");
                const headerHeight = header
                    ? header.offsetHeight
                    : 0;

                const targetPosition =
                    targetSection.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                smoothScrollTo(targetPosition, 1000);
            }
        }

        if (mainNav && menuToggle) {
            mainNav.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
});

      // GOOGLE SHEETS INQUIRY FORM

const inquiryForm = document.getElementById("inquiryForm");
const formSuccess = document.getElementById("formSuccess");

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz51WHlTbOWUCZikUyi-_0vgsZWk_Hcv9ZEdWn5RmJ2ugUNrQwvGNe-f5xXnGZi5lp7/exec";

if (inquiryForm && formSuccess) {
    inquiryForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("FGF INQUIRY FORM SUBMITTED");

        const nameField = inquiryForm.querySelector(
            'input[name="name"], input[id="name"]'
        );

        const emailField = inquiryForm.querySelector(
            'input[type="email"], input[name="email"], input[id="email"]'
        );

        const phoneField = inquiryForm.querySelector(
            'input[type="tel"], input[name="phone"], input[id="phone"]'
        );

        const messageField = inquiryForm.querySelector("textarea");
        const inquiryTypeField =
    document.getElementById("interest");

        const name = nameField ? nameField.value.trim() : "";
        const email = emailField ? emailField.value.trim() : "";
        const phone = phoneField ? phoneField.value.trim() : "";
        const message = messageField ? messageField.value.trim() : "";
        const inquiryType = inquiryTypeField
    ? inquiryTypeField.value
    : "";

        if (!name || !email || !inquiryType || !message) {
            formSuccess.textContent =
                "Please complete all required fields.";
            formSuccess.style.color = "#d93025";
            formSuccess.style.display = "block";
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            formSuccess.textContent =
                "Please enter a valid email address.";
            formSuccess.style.color = "#d93025";
            formSuccess.style.display = "block";
            return;
        }

        formSuccess.textContent = "Sending your inquiry...";
        formSuccess.style.color = "#25b94b";
        formSuccess.style.display = "block";

        try {
             console.log("Sending inquiry to:", GOOGLE_SCRIPT_URL);
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify({
    name: name,
    email: email,
    phone: phone,
    inquiryType: inquiryType,
    message: message
})
            });

            formSuccess.textContent =
                "Thank you! Your inquiry has been received.";
            formSuccess.style.color = "#25b94b";

            inquiryForm.reset();

        } catch (error) {
            formSuccess.textContent =
                "Something went wrong. Please try again.";
            formSuccess.style.color = "#d93025";
        }
    });
}
/* ========================================
   TWO-WAY SCROLL REVEAL ANIMATIONS
======================================== */

// LEFT-SIDE ELEMENTS
const leftSideElements = document.querySelectorAll(
    ".hero-content, " +
    ".about-content, " +
    ".pt-content, " +
    ".facilities-heading, " +
    ".contact-content, " +
    ".inquiry-heading, " +
    ".footer-brand, " +
    ".founder-content"
);

// RIGHT-SIDE ELEMENTS
const rightSideElements = document.querySelectorAll(
    ".hero-button, " +
    ".about-image, " +
    ".pt-image, " +
    ".facilities-showcase, " +
    ".map-wrapper, " +
    ".inquiry-box, " +
    ".founder-image-wrapper"
);

// CENTER ELEMENTS
const centerElements = document.querySelectorAll(
    ".training-heading, " +
    ".training-card, " +
    ".facility-bottom-text, " +
    ".contact-info-item, " +
    ".footer-column, " +
    ".founder-section > .section-heading"
);

// COMBINE ALL ELEMENTS
const allRevealElements = [
    ...leftSideElements,
    ...rightSideElements,
    ...centerElements
];

// INITIAL POSITION: LEFT
leftSideElements.forEach(function (element) {
    element.style.opacity = "0";
    element.style.transform = "translateX(-90px)";
    element.style.transition =
        "opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1), " +
        "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)";
});

// INITIAL POSITION: RIGHT
rightSideElements.forEach(function (element) {
    element.style.opacity = "0";
    element.style.transform = "translateX(90px)";
    element.style.transition =
        "opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1), " +
        "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)";
});

// INITIAL POSITION: CENTER
centerElements.forEach(function (element) {
    element.style.opacity = "0";
    element.style.transform = "translateY(45px)";
    element.style.transition =
        "opacity 1.3s cubic-bezier(0.22, 1, 0.36, 1), " +
        "transform 1.3s cubic-bezier(0.22, 1, 0.36, 1)";
});

// OBSERVER
const twoWayRevealObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            const element = entry.target;

            if (entry.isIntersecting) {
                element.style.opacity = "1";
                element.style.transform =
                    "translateX(0) translateY(0)";
            } else {
                if (
                    element.matches(
                        ".hero-content, " +
                        ".about-content, " +
                        ".pt-content, " +
                        ".facilities-heading, " +
                        ".contact-content, " +
                        ".inquiry-heading, " +
                        ".footer-brand, " +
                        ".founder-content"
                    )
                ) {
                    element.style.transform =
                        "translateX(-90px)";
                } else if (
                    element.matches(
                        ".hero-button, " +
                        ".about-image, " +
                        ".pt-image, " +
                        ".facilities-showcase, " +
                        ".map-wrapper, " +
                        ".inquiry-box, " +
                        ".founder-image-wrapper"
                    )
                ) {
                    element.style.transform =
                        "translateX(90px)";
                } else {
                    element.style.transform =
                        "translateY(45px)";
                }

                element.style.opacity = "0";
            }
        });
    },
    {
        threshold: 0.15
    }
);

// START OBSERVING
allRevealElements.forEach(function (element) {
    twoWayRevealObserver.observe(element);
});
// SLOW HOME ANIMATION ON PAGE LOAD

function animateHomeOnLoad() {
    const heroContent = document.querySelector(".hero-content");
    const heroButton = document.querySelector(".hero-button");

    if (!heroContent) {
        return;
    }

    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateX(-120px)";
    heroContent.style.transition =
        "opacity 1.8s cubic-bezier(0.22, 1, 0.36, 1), " +
        "transform 1.8s cubic-bezier(0.22, 1, 0.36, 1)";

    if (heroButton) {
        heroButton.style.opacity = "0";
        heroButton.style.transform = "translateX(100px)";
        heroButton.style.transition =
            "opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1), " +
            "transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)";
    }

    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            heroContent.style.opacity = "1";
            heroContent.style.transform = "translateX(0)";

            if (heroButton) {
                setTimeout(function () {
                    heroButton.style.opacity = "1";
                    heroButton.style.transform = "translateX(0)";
                }, 500);
            }
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", animateHomeOnLoad);
} else {
    animateHomeOnLoad();
}
// ACTIVE NAVIGATION LINK

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".main-nav a");

function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.pageYOffset >= sectionTop &&
            window.pageYOffset < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navigationLinks.forEach(function (link) {
        link.classList.remove("active");

        const linkTarget = link.getAttribute("href");

        if (linkTarget === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);
window.addEventListener("load", updateActiveNavigation);

updateActiveNavigation();
// SCROLL PROGRESS BAR

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
    if (!scrollProgress) {
        return;
    }

    const scrollTop = window.pageYOffset;
    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width = scrollPercentage + "%";
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

updateScrollProgress();

/* ========================================
   GALLERY LIGHTBOX WITH PREVIOUS / NEXT
======================================== */

const galleryItems = document.querySelectorAll(".gallery-item");
const galleryLightbox = document.getElementById("galleryLightbox");
const galleryLightboxImage = document.getElementById("galleryLightboxImage");
const galleryLightboxClose = document.querySelector(".gallery-lightbox-close");
const galleryPrev = document.querySelector(".gallery-lightbox-prev");
const galleryNext = document.querySelector(".gallery-lightbox-next");

if (
    galleryItems.length &&
    galleryLightbox &&
    galleryLightboxImage &&
    galleryLightboxClose &&
    galleryPrev &&
    galleryNext
) {
    // Exclude duplicated photos used for the infinite-scroll effect.
    const galleryImages = Array.from(galleryItems)
        .filter(function (item) {
            return !item.closest(
                '.gallery-loop-group[aria-hidden="true"]'
            );
        })
        .map(function (item) {
            return item.querySelector("img");
        })
        .filter(Boolean);

    let currentGalleryIndex = 0;

    function showGalleryImage(index) {
        currentGalleryIndex =
            (index + galleryImages.length) % galleryImages.length;

        const image = galleryImages[currentGalleryIndex];

        galleryLightboxImage.src = image.src;
        galleryLightboxImage.alt = image.alt || "Gallery image";
    }

    function openGalleryImage(image) {
        const index = galleryImages.indexOf(image);

        if (index < 0) return;

        currentGalleryIndex = index;
        showGalleryImage(currentGalleryIndex);

        galleryLightbox.classList.add("active");
        galleryLightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeGalleryImage() {
        galleryLightbox.classList.remove("active");
        galleryLightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    galleryItems.forEach(function (item) {
        const image = item.querySelector("img");
        if (!image) return;

        item.addEventListener("click", function () {
            // Map duplicate marquee photos back to their original.
            const originalImage = galleryImages.find(function (original) {
                return original.src === image.src;
            });

            if (originalImage) {
                openGalleryImage(originalImage);
            }
        });
    });

    galleryPrev.addEventListener("click", function (event) {
        event.stopPropagation();
        showGalleryImage(currentGalleryIndex - 1);
    });

    galleryNext.addEventListener("click", function (event) {
        event.stopPropagation();
        showGalleryImage(currentGalleryIndex + 1);
    });

    galleryLightboxClose.addEventListener(
        "click",
        closeGalleryImage
    );

    galleryLightbox.addEventListener("click", function (event) {
        if (event.target === galleryLightbox) {
            closeGalleryImage();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (!galleryLightbox.classList.contains("active")) return;

        if (event.key === "ArrowLeft") {
            showGalleryImage(currentGalleryIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showGalleryImage(currentGalleryIndex + 1);
        }

        if (event.key === "Escape") {
            closeGalleryImage();
        }
    });
}

/* ========================================
   TESTIMONIAL CAROUSEL
======================================== */

const testimonialsSlider =
    document.querySelector(".testimonials-slider");

const testimonialsTrack =
    document.querySelector(".testimonials-track");

const testimonialCards =
    document.querySelectorAll(".testimonial-card");

const testimonialPrev =
    document.querySelector(".testimonial-prev");

const testimonialNext =
    document.querySelector(".testimonial-next");

const testimonialDots =
    document.querySelector(".testimonial-dots");

if (
    testimonialsSlider &&
    testimonialsTrack &&
    testimonialCards.length &&
    testimonialPrev &&
    testimonialNext &&
    testimonialDots
) {
    let currentTestimonial = 0;
    let testimonialTimer;

    function getCardsPerView() {
        return window.innerWidth <= 768 ? 1 : 2;
    }

    function getTotalSlides() {
        return Math.ceil(
            testimonialCards.length / getCardsPerView()
        );
    }

    function createTestimonialDots() {
        testimonialDots.innerHTML = "";

        const totalSlides = getTotalSlides();

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "testimonial-dot";

            dot.setAttribute(
                "aria-label",
                "Go to testimonial slide " + (i + 1)
            );

            dot.addEventListener("click", function () {
                currentTestimonial = i;
                updateTestimonials();
                restartTestimonialTimer();
            });

            testimonialDots.appendChild(dot);
        }
    }

    function updateTestimonials() {
        const cardsPerView = getCardsPerView();
        const totalSlides = getTotalSlides();

        if (currentTestimonial >= totalSlides) {
            currentTestimonial = 0;
        }

        const slideWidth =
            100 / cardsPerView;

        testimonialsTrack.style.transform =
            "translateX(-" +
            currentTestimonial * 100 +
            "%)";

        const dots =
            testimonialDots.querySelectorAll(".testimonial-dot");

        dots.forEach(function (dot, index) {
            dot.classList.toggle(
                "active",
                index === currentTestimonial
            );
        });
    }

    function nextTestimonial() {
        currentTestimonial++;

        if (currentTestimonial >= getTotalSlides()) {
            currentTestimonial = 0;
        }

        updateTestimonials();
    }

    function previousTestimonial() {
        currentTestimonial--;

        if (currentTestimonial < 0) {
            currentTestimonial = getTotalSlides() - 1;
        }

        updateTestimonials();
    }

    function startTestimonialTimer() {
        testimonialTimer = setInterval(
            nextTestimonial,
            5000
        );
    }

    function stopTestimonialTimer() {
        clearInterval(testimonialTimer);
    }

    function restartTestimonialTimer() {
        stopTestimonialTimer();
        startTestimonialTimer();
    }

    testimonialNext.addEventListener(
        "click",
        function () {
            nextTestimonial();
            restartTestimonialTimer();
        }
    );

    testimonialPrev.addEventListener(
        "click",
        function () {
            previousTestimonial();
            restartTestimonialTimer();
        }
    );

    testimonialsSlider.addEventListener(
        "mouseenter",
        stopTestimonialTimer
    );

    testimonialsSlider.addEventListener(
        "mouseleave",
        startTestimonialTimer
    );

    window.addEventListener(
        "resize",
        function () {
            currentTestimonial = 0;
            createTestimonialDots();
            updateTestimonials();
        }
    );

    createTestimonialDots();
    updateTestimonials();
    startTestimonialTimer();
}
// Always open the website from the top after refreshing
window.addEventListener("load", function () {
    if (window.location.hash) {
        history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
        );
        window.scrollTo(0, 0);
    }
});
// Transparent header becomes white after scrolling

const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
    function updateHeaderOnScroll() {
        if (window.scrollY > 40) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeaderOnScroll, {
        passive: true
    });

    updateHeaderOnScroll();
}
/* =================================
   FOUNDER SCROLL REVEAL
================================= */

const founderSection = document.querySelector("#founder");

if (founderSection) {
    const founderObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    founderSection.classList.add("show-founder");

                    // Run only once
                    founderObserver.unobserve(founderSection);
                }
            });
        },
        {
            threshold: 0.25
        }
    );

    founderObserver.observe(founderSection);
}
/* ACTIVITIES SCROLL ANIMATION */

const activitiesSection = document.querySelector("#activities-teaser");

if (activitiesSection) {

    const activitiesObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    activitiesSection.classList.add("is-visible");

                    activitiesObserver.unobserve(
                        activitiesSection
                    );

                }

            });

        },
        {
            threshold: 0.18
        }
    );

    activitiesObserver.observe(activitiesSection);
}
/* =========================================================
   MOBILE ACTIVITIES DROPDOWN
   ========================================================= */

const activitiesTrigger =
    document.querySelector(".nav-dropdown-trigger");

const activitiesDropdown =
    document.querySelector(".nav-dropdown");


if (activitiesTrigger && activitiesDropdown) {

    activitiesTrigger.addEventListener(
        "click",
        function (event) {

            /* Stop the normal navigation handler */
            event.preventDefault();
            event.stopPropagation();

            /* Only use dropdown behaviour on mobile */
            if (window.innerWidth <= 768) {

                activitiesDropdown.classList.toggle(
                    "mobile-open"
                );

            }

        },
        true
    );

}
/* =========================================================
   VISHWAKARMA PUJA — GALLERY LIGHTBOX
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const galleryImages =
        document.querySelectorAll(".event-gallery-item img");

    const lightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const closeButton =
        document.getElementById("lightboxClose");

    const previousButton =
        document.getElementById("lightboxPrev");

    const nextButton =
        document.getElementById("lightboxNext");


    /* If the elements don't exist, stop */

    if (
        !galleryImages.length ||
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }


    let currentImage = 0;


    /* ---------------------------------------------------------
       SHOW IMAGE
       --------------------------------------------------------- */

    function showImage(index) {

        if (index < 0) {
            index = galleryImages.length - 1;
        }

        if (index >= galleryImages.length) {
            index = 0;
        }

        currentImage = index;

        lightboxImage.src =
            galleryImages[currentImage].src;

        lightboxImage.alt =
            galleryImages[currentImage].alt || "Gallery image";
    }


    /* ---------------------------------------------------------
       OPEN LIGHTBOX
       --------------------------------------------------------- */

    function openLightbox(index) {

        showImage(index);

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    /* ---------------------------------------------------------
       CLOSE LIGHTBOX
       --------------------------------------------------------- */

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";
    }


    /* ---------------------------------------------------------
       GALLERY IMAGE CLICK
       --------------------------------------------------------- */

    galleryImages.forEach(function (image, index) {

        image.addEventListener("click", function () {

            openLightbox(index);

        });

    });


    /* ---------------------------------------------------------
       NEXT
       --------------------------------------------------------- */

    nextButton.addEventListener("click", function (event) {

        event.stopPropagation();

        showImage(currentImage + 1);

    });


    /* ---------------------------------------------------------
       PREVIOUS
       --------------------------------------------------------- */

    previousButton.addEventListener("click", function (event) {

        event.stopPropagation();

        showImage(currentImage - 1);

    });


    /* ---------------------------------------------------------
       CLOSE BUTTON
       --------------------------------------------------------- */

    closeButton.addEventListener("click", function () {

        closeLightbox();

    });


    /* ---------------------------------------------------------
       CLICK OUTSIDE IMAGE
       --------------------------------------------------------- */

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    /* ---------------------------------------------------------
       KEYBOARD CONTROLS
       --------------------------------------------------------- */

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) {
            return;
        }


        if (event.key === "ArrowRight") {

            showImage(currentImage + 1);

        }


        if (event.key === "ArrowLeft") {

            showImage(currentImage - 1);

        }


        if (event.key === "Escape") {

            closeLightbox();

        }

    });

});

/* ========================================
   TESTIMONIAL READ MORE / READ LESS
======================================== */

document.querySelectorAll(".testimonial-card").forEach(function (card) {
    const review = card.querySelector(".testimonial-text");

    if (!review) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "testimonial-read-more";
    button.textContent = "Read more";
    button.setAttribute("aria-expanded", "false");

    review.insertAdjacentElement("afterend", button);

    button.addEventListener("click", function () {
        const isExpanded = card.classList.toggle("review-expanded");

        button.textContent = isExpanded ? "Read less" : "Read more";
        button.setAttribute("aria-expanded", String(isExpanded));
    });
});

function highlightFounderVision() {
    const quote = document.querySelector(".founder-vision blockquote");

    if (!quote || quote.dataset.visionStyled === "true") return;

    function wrapQuoteMark(character, findLast = false) {
        const walker = document.createTreeWalker(
            quote,
            NodeFilter.SHOW_TEXT
        );

        let node;

        while ((node = walker.nextNode())) {
            const index = findLast
                ? node.textContent.lastIndexOf(character)
                : node.textContent.indexOf(character);

            if (index === -1) continue;

            const text = node.textContent;
            const fragment = document.createDocumentFragment();

            fragment.append(
                document.createTextNode(text.slice(0, index))
            );

            const mark = document.createElement("span");
            mark.className = "vision-quote-mark";
            mark.textContent = character;

            fragment.append(mark);
            fragment.append(
                document.createTextNode(text.slice(index + 1))
            );

            node.parentNode.replaceChild(fragment, node);
            return;
        }
    }

    // Style the existing quotation marks
    wrapQuoteMark("“");
    wrapQuoteMark("”", true);

    // Highlight the first sentence
    const pattern =
        /Fitness\s+is\s+not\s+just\s+a\s+temporary\s+goal\s+or\s+simply\s+about\s+lifting\s+heavy\s+weights/;

    const walker = document.createTreeWalker(
        quote,
        NodeFilter.SHOW_TEXT
    );

    let node;

    while ((node = walker.nextNode())) {
        const match = node.textContent.match(pattern);
        if (!match) continue;

        const parts = node.textContent.split(match[0]);
        const highlighted = document.createElement("span");

        highlighted.className = "vision-highlight";
        highlighted.textContent = match[0];

        const fragment = document.createDocumentFragment();

        fragment.append(document.createTextNode(parts[0]));
        fragment.append(highlighted);
        fragment.append(
            document.createTextNode(parts.slice(1).join(match[0]))
        );

        node.parentNode.replaceChild(fragment, node);
        break;
    }

    quote.dataset.visionStyled = "true";
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", highlightFounderVision);
} else {
    highlightFounderVision();
}

/* ==========================================
   FGF FOOTBALL GALLERY LIGHTBOX
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".fgf-photo-gallery");
    const lightbox = document.getElementById("fgfLightbox");
    const lightboxImage = document.getElementById("fgfLightboxImage");
    const counter = document.getElementById("fgfLightboxCounter");

    const closeButton = document.getElementById("fgfLightboxClose");
    const prevButton = document.getElementById("fgfLightboxPrev");
    const nextButton = document.getElementById("fgfLightboxNext");

    if (
        !gallery ||
        !lightbox ||
        !lightboxImage ||
        !counter ||
        !closeButton ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }

    const images = Array.from(
        gallery.querySelectorAll(".event-gallery-item img")
    );

    if (!images.length) return;

    let currentIndex = 0;
    let previousOverflow = "";

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;

        const selectedImage = images[currentIndex];

        lightboxImage.src = selectedImage.currentSrc || selectedImage.src;
        lightboxImage.alt = selectedImage.alt || "Football tournament photo";

        counter.textContent =
            `${currentIndex + 1} / ${images.length}`;
    }

    function openLightbox(index) {
        previousOverflow = document.body.style.overflow;

        showImage(index);

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("fgf-lightbox-open");
        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("fgf-lightbox-open");
        document.body.style.overflow = previousOverflow;
    }

    images.forEach((image, index) => {
        image.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    prevButton.addEventListener("click", () => {
        showImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showImage(currentIndex + 1);
    });
    
/* Mobile swipe navigation */
let touchStartX = 0;
let touchStartY = 0;

lightboxImage.addEventListener("touchstart", function (event) {
    if (event.touches.length !== 1) return;

    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}, { passive: true });

lightboxImage.addEventListener("touchend", function (event) {
    if (event.changedTouches.length !== 1) return;

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Only respond to clear horizontal swipes
    if (
        Math.abs(deltaX) > 50 &&
        Math.abs(deltaX) > Math.abs(deltaY) * 1.3
    ) {
        if (deltaX < 0) {
            showImage(currentIndex + 1); // Swipe left: next
        } else {
            showImage(currentIndex - 1); // Swipe right: previous
        }
    }
}, { passive: true });


    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        } else if (event.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        } else if (event.key === "ArrowRight") {
            showImage(currentIndex + 1);
        }
    });
});
