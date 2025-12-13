/* GSAP initialization: Register plugins for advanced features */
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. General GSAP Scroll Reveal Animation (Sections and Cards) ---
    // Applies a subtle, professional fade-in/slide-up effect to all major elements
    document.querySelectorAll('.scroll-animate').forEach((el) => {
        gsap.fromTo(el, {
            y: 50,
            opacity: 0,
            scale: 0.98
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%", // Start animation earlier for smoother feel
                toggleActions: "play none none none"
            }
        });
    });

    // --- 2. Typewriter Effect for Hero Title (Extraordinary Feature) ---
    const typewriterElement = document.getElementById('typewriter');
    const texts = [
        "Geospatial Developer.",
        "Spatial Machine Learning Expert.",
        "Full-Stack Web Developer.",
        "Disaster Risk Analyst."
    ];
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < texts[textIndex].length) {
            typewriterElement.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 70);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typewriterElement.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 30);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 700);
        }
    }

    // Start the typewriter after the main title loads
    setTimeout(type, 1800);


    // --- 3. Interactive Statistic Boxes (GSAP Lift & Shadow Polish) ---
    // Adds a physics-based lift for an "extraordinary" feel, complementing the CSS 3D flip.
    document.querySelectorAll('.stat-box').forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            gsap.to(stat, {
                y: -5,
                scale: 1.02,
                duration: 0.3,
                boxShadow: "0 20px 40px rgba(0, 255, 255, 0.4)",
                ease: "power2.out"
            });
        });

        stat.addEventListener('mouseleave', () => {
            gsap.to(stat, {
                y: 0,
                scale: 1,
                duration: 0.5,
                boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                ease: "elastic.out(1, 0.5)"
            });
        });
    });


// --- 4. Project Cards Staggered Scroll Reveal ---
gsap.fromTo(
    ".projects-grid .project-card",
    {
        y: 60,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform,opacity", // releases GSAP control
        scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 75%",
            once: true
        }
    }
);



    // --- 5. Tab Functionality (About Section) - Smooth GSAP Transitions ---
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));

            const activeContent = document.querySelector('.tab-content:not([style*="display: none"])');
            const newContent = document.getElementById(btn.dataset.tab);

            if (activeContent && activeContent !== newContent) {
                // Fade out old content
                gsap.to(activeContent, {
                    opacity: 0,
                    y: -10,
                    duration: 0.3,
                    onComplete: () => {
                        activeContent.style.display = 'none';

                        // Fade in new content
                        btn.classList.add('active');
                        newContent.style.display = 'block';
                        gsap.fromTo(newContent, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
                    }
                });
            } else {
                // Initial load or clicking the already active tab
                btn.classList.add('active');
                if(newContent.style.display === 'none' || !newContent.style.display) {
                    newContent.style.display = 'block';
                    gsap.fromTo(newContent, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
                }
            }
        });
    });

    // === Click-to-Copy for Direct Contact ===
document.querySelectorAll(".contact-item[data-value]").forEach(item => {
    item.addEventListener("click", () => {
        const value = item.getAttribute("data-value");
        navigator.clipboard.writeText(value).then(() => {
            alert(`${value} copied to clipboard!`);
        });
    });
});

// === Contact Form Submission via EmailJS ===
// You need to sign up at https://www.emailjs.com/ and get serviceID, templateID, userID
// Replace the placeholders below with your actual EmailJS info
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const status = document.getElementById("formStatus");
    const formData = {
        name: this.name.value,
        email: this.email.value,
        subject: this.subject.value,
        message: this.message.value
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_USER_ID")
    .then(() => {
        status.innerText = "Message sent successfully!";
        status.style.color = "#22c55e"; // green
        this.reset();
    }, (err) => {
        status.innerText = "Failed to send message. Try again!";
        status.style.color = "#ef4444"; // red
        console.error(err);
    });
});

    // --- 6. Interactive Contact Details (Copy to Clipboard) ---
    // Provides cool interactivity by automatically copying contact details on click.
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Prevent link navigation for non-social links
            if (!item.classList.contains('social-link')) {
                e.preventDefault();
                const value = item.getAttribute('data-value');
                const originalText = item.getAttribute('data-text');

                navigator.clipboard.writeText(value).then(() => {
                    // Temporarily update hover text for visual confirmation
                    item.setAttribute('data-text', 'COPIED!');

                    // Use GSAP to visually confirm the copy action
                    gsap.to(item, { backgroundColor: 'rgba(0, 255, 255, 0.4)', duration: 0.2, yoyo: true, repeat: 1, onComplete: () => {
                        item.style.backgroundColor = ''; // Remove temp background after flash
                    }});
                    
                    setTimeout(() => {
                        item.setAttribute('data-text', originalText);
                    }, 1500);
                }).catch(err => {
                    console.error('Could not copy text: ', err);
                });
            }
        });
    });
});