/**
 * ARKTERA SYSTEMS — Contact Form
 * Quick, low-friction enquiry form. Relies on the shared Supabase
 * client set up in scripts/supabase.js (loaded before this file).
 */
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const errorBox = document.getElementById("form-error");
const successBox = document.getElementById("formSuccess");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorBox.classList.remove("visible");

    // Validation
    const requiredFields = form.querySelectorAll("[required]");
    let hasError = false;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("invalid");
        hasError = true;
      } else {
        field.classList.remove("invalid");
      }
    });

    if (hasError) {
      errorBox.textContent = "Please complete all required fields before submitting.";
      errorBox.classList.add("visible");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.querySelector("span").textContent = "Sending...";

    const formData = {
      form_type: "contact",
      first_name: form.first_name?.value || "",
      last_name: form.last_name?.value || "",
      business: form.business?.value || "",
      email: form.email?.value || "",
      phone: form.phone?.value || "",
      subject: form.subject?.value || "",
      message: form.message?.value || "",
    };

    try {
      const response = await fetch(window.ARKTERA_CONFIG.CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: window.ARKTERA_CONFIG.PUBLISHABLE_KEY,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed.");
      }

      // Success UI
      form.setAttribute("hidden", "");
      successBox.removeAttribute("hidden");
      successBox.focus();

      form.reset();
    } catch (err) {
      console.error(err);

      errorBox.textContent =
        "Unable to send your message right now. Please try again shortly.";

      errorBox.classList.add("visible");

      submitBtn.disabled = false;
      submitBtn.querySelector("span").textContent = "Send Message";
    }
  });

  // Remove validation styling as user types
  form.querySelectorAll(".form-input, .form-select, .form-textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("invalid");
    });
  });
}
