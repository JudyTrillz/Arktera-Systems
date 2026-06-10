const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const errorBox = document.getElementById("form-error");
const successBox = document.getElementById("formSuccess");

const SUPABASE_URL = "https://mxtwqmcbyslvaqryksww.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_y5dYbF2-dJipNnrBELfPBQ_86dVwtrj";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorBox.style.display = "none";

    // Validation
    const requiredFields = form.querySelectorAll("[required]");
    let hasError = false;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "var(--red)";
        hasError = true;
      } else {
        field.style.borderColor = "";
      }
    });

    if (hasError) {
      errorBox.textContent = "Please complete all required fields before submitting.";
      errorBox.style.display = "block";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.querySelector("span").textContent = "Submitting Request...";

    const formData = {
      name: form.name?.value || "",
      business: form.business?.value || "",
      email: form.email?.value || "",
      website: form.website?.value || "",
      business_type: form.business_type?.value || "",
      lead_sources: form.lead_sources?.value || "",
      lead_volume: form.lead_volume?.value || "",
      challenge: form.challenge?.value || "",
      goals: form.goals?.value || "",
    };

    try {
      const { error } = await supabaseClient.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) {
        throw error;
      }

      // Success UI
      form.setAttribute("hidden", "");
      successBox.removeAttribute("hidden");
      successBox.focus();

      form.reset();
    } catch (err) {
      console.error(err);

      errorBox.textContent =
        "Unable to submit your request right now. Please try again shortly.";

      errorBox.style.display = "block";

      submitBtn.disabled = false;
      submitBtn.querySelector("span").textContent = "Request Visibility Audit";
    }
  });

  // Remove validation styling as user types
  form.querySelectorAll(".form-input, .form-select, .form-textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.style.borderColor = "";
    });
  });
}
