// Page Loading
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    console.log("%c🚀 WF AUTOM8 - Automation Made Easy", "color: #ff0033; font-size: 16px; font-weight: bold;");
});

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.style.opacity = navLinks.classList.contains("active") ? "0.7" : "1";
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                hamburger.style.opacity = "1";
            });
        });
    }

    // Contact Form Submit to n8n
    const form = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (!form) {
        console.error("contactForm not found");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            showStatus("❌ Please fill all fields.", "error");
            return;
        }

        const data = {
            name: name,
            email: email,
            service: message,
            source: "WF AUTOM8 Website"
        };

        const submitBtn = form.querySelector('button[type="submit"]');
        const oldText = submitBtn.innerText;

        try {
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            const response = await fetch("https://n8n-y3r8.onrender.com/webhook/lead-capture", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showStatus("✅ Request sent successfully!", "success");
                form.reset();
            } else {
                showStatus("❌ Webhook error. Check n8n.", "error");
            }
        } catch (error) {
            console.error(error);
            showStatus("❌ Connection error. Check webhook/CORS.", "error");
        } finally {
            submitBtn.innerText = oldText;
            submitBtn.disabled = false;
        }
    });

    function showStatus(message, type) {
        if (!formStatus) return;
        formStatus.innerText = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = "block";
    }
});
