/**
 * ARKTERA SYSTEMS — Business Growth Assessment
 * Multi-step wizard: navigation, inline validation, localStorage
 * autosave/restore, review rendering, Supabase submission.
 */
"use strict";

(function () {
  const form = document.getElementById("assessmentForm");
  if (!form) return;

  const STORAGE_KEY = "arktera-assessment-progress";
  const PROGRESS_TTL_MS = 60 * 60 * 1000; // clear unsubmitted progress after 1 hour away
  const TOTAL_STEPS = 5;
  const STEP_NAMES = [
    "Business Information",
    "Business Overview",
    "Current Challenges",
    "Business Goals",
    "Review",
  ];
  const STEP_REQUIRED = {
    1: ["businessName", "yourName", "email", "website", "businessLocation", "industry"],
    2: ["description", "primaryServices", "idealCustomers", "areasServed"],
    3: ["challenges"],
    4: ["goals"],
    5: ["confirm"],
  };

  const stepPanels = [...form.querySelectorAll(".assessment-step")];
  const stepperEl = document.querySelector(".assessment-stepper");
  const progressBarEl = document.querySelector(".assessment-progress-bar");
  const stepperSteps = [...document.querySelectorAll(".assessment-stepper-step")];
  const progressFill = document.getElementById("assessmentProgressFill");
  const stepIndicator = document.getElementById("assessmentStepIndicator");
  const prevBtn = document.getElementById("assessmentPrevBtn");
  const nextBtn = document.getElementById("assessmentNextBtn");
  const submitBtn = document.getElementById("assessmentSubmitBtn");
  const errorBox = document.getElementById("assessment-error");
  const reviewSummary = document.getElementById("reviewSummary");
  const successBox = document.getElementById("assessmentSuccess");
  const confirmCheckbox = document.getElementById("a-confirm");

  const otherChallengeCheckbox = document.getElementById("a-challenge-other");
  const otherChallengeWrap = document.getElementById("a-challenge-other-wrap");
  const otherGoalCheckbox = document.getElementById("a-goal-other");
  const otherGoalWrap = document.getElementById("a-goal-other-wrap");

  const defaultState = {
    currentStep: 1,
    businessName: "",
    yourName: "",
    email: "",
    phone: "",
    website: "",
    businessLocation: "",
    industry: "",
    description: "",
    primaryServices: "",
    idealCustomers: "",
    areasServed: "",
    challenges: [],
    otherChallengeText: "",
    goals: [],
    otherGoalText: "",
    additionalInfo: "",
    confirm: false,
  };

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && typeof saved === "object") {
        const isExpired = !saved.savedAt || Date.now() - saved.savedAt > PROGRESS_TTL_MS;
        if (isExpired) {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          return Object.assign({}, defaultState, saved);
        }
      }
    } catch (err) {
      /* malformed storage — fall through to defaults */
    }
    return Object.assign({}, defaultState);
  }

  function saveState() {
    try {
      state.savedAt = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      /* storage unavailable — progress just won't persist */
    }
  }

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value == null ? "" : String(value);
    return div.innerHTML;
  }

  function isValidUrl(value) {
    try {
      new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
      return true;
    } catch (err) {
      return false;
    }
  }

  let state = loadState();

  function populateForm() {
    form.querySelectorAll("input, textarea, select").forEach((field) => {
      const name = field.name;
      if (!name || !(name in state)) return;

      if (field.type === "checkbox") {
        if (name === "challenges" || name === "goals") {
          field.checked = state[name].includes(field.value);
        } else {
          field.checked = !!state[name];
        }
        field.closest(".option-chip")?.classList.toggle("is-checked", field.checked);
      } else {
        field.value = state[name] || "";
      }
    });

    otherChallengeWrap.hidden = !otherChallengeCheckbox.checked;
    otherGoalWrap.hidden = !otherGoalCheckbox.checked;
  }

  function setFieldError(name, message) {
    const el = form.querySelector(`[data-error-for="${name}"]`);
    if (el) {
      el.textContent = message;
      el.classList.add("visible");
    }
    const field = form.querySelector(`[name="${name}"]`);
    if (
      field &&
      (field.classList.contains("form-input") ||
        field.classList.contains("form-select") ||
        field.classList.contains("form-textarea"))
    ) {
      field.classList.add("invalid");
    }
  }

  function clearFieldError(name) {
    const el = form.querySelector(`[data-error-for="${name}"]`);
    if (el) {
      el.textContent = "";
      el.classList.remove("visible");
    }
    const field = form.querySelector(`[name="${name}"]`);
    if (field) field.classList.remove("invalid");
  }

  function handleFieldChange(e) {
    const field = e.target;
    const name = field.name;
    if (!name) return;

    if (name === "challenges" || name === "goals") {
      const set = new Set(state[name]);
      if (field.checked) set.add(field.value);
      else set.delete(field.value);
      state[name] = [...set];

      field.closest(".option-chip")?.classList.toggle("is-checked", field.checked);

      if (field === otherChallengeCheckbox) otherChallengeWrap.hidden = !field.checked;
      if (field === otherGoalCheckbox) otherGoalWrap.hidden = !field.checked;

      clearFieldError(name);
    } else if (field.type === "checkbox") {
      state[name] = field.checked;
      field.closest(".option-chip")?.classList.toggle("is-checked", field.checked);
      clearFieldError(name);
    } else {
      state[name] = field.value;
      clearFieldError(name);
    }

    saveState();
  }

  form.addEventListener("input", handleFieldChange);
  form.addEventListener("change", handleFieldChange);

  confirmCheckbox.addEventListener("change", () => {
    submitBtn.disabled = !confirmCheckbox.checked;
  });

  function validateStep(step) {
    const required = STEP_REQUIRED[step] || [];
    let valid = true;

    required.forEach((name) => {
      clearFieldError(name);

      if (name === "challenges" || name === "goals") {
        if (!state[name].length) {
          setFieldError(name, "Please select at least one option.");
          valid = false;
        }
        return;
      }

      if (name === "confirm") {
        if (!state.confirm) {
          setFieldError(name, "Please confirm before submitting.");
          valid = false;
        }
        return;
      }

      const value = (state[name] || "").toString().trim();

      if (!value) {
        setFieldError(name, "This field is required.");
        valid = false;
        return;
      }

      if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setFieldError(name, "Enter a valid email address.");
        valid = false;
      }

      if (name === "website" && !isValidUrl(value)) {
        setFieldError(name, "Enter a valid URL (e.g. https://example.com).");
        valid = false;
      }
    });

    return valid;
  }

  function renderStepper() {
    stepperSteps.forEach((el) => {
      const n = parseInt(el.dataset.stepper, 10);
      el.classList.toggle("is-active", n === state.currentStep);
      el.classList.toggle("is-complete", n < state.currentStep);
    });

    progressFill.style.width = `${(state.currentStep / TOTAL_STEPS) * 100}%`;
    stepIndicator.textContent = `Step ${state.currentStep} of ${TOTAL_STEPS} — ${STEP_NAMES[state.currentStep - 1]}`;
  }

  function renderReview() {
    const challenges = state.challenges
      .filter((c) => c !== "Other")
      .concat(state.challenges.includes("Other") && state.otherChallengeText ? [state.otherChallengeText] : []);
    const goals = state.goals
      .filter((g) => g !== "Other")
      .concat(state.goals.includes("Other") && state.otherGoalText ? [state.otherGoalText] : []);

    reviewSummary.innerHTML = `
      <div class="review-section">
        <div class="review-section-head">
          <h4>Business Information</h4>
          <button type="button" class="review-edit-btn" data-goto-step="1">Edit</button>
        </div>
        <div class="review-row"><span>Business Name</span><span>${escapeHtml(state.businessName) || "—"}</span></div>
        <div class="review-row"><span>Your Name</span><span>${escapeHtml(state.yourName) || "—"}</span></div>
        <div class="review-row"><span>Email</span><span>${escapeHtml(state.email) || "—"}</span></div>
        <div class="review-row"><span>Phone</span><span>${escapeHtml(state.phone) || "—"}</span></div>
        <div class="review-row"><span>Website</span><span>${escapeHtml(state.website) || "—"}</span></div>
        <div class="review-row"><span>Location</span><span>${escapeHtml(state.businessLocation) || "—"}</span></div>
        <div class="review-row"><span>Industry</span><span>${escapeHtml(state.industry) || "—"}</span></div>
      </div>
      <div class="review-section">
        <div class="review-section-head">
          <h4>Business Overview</h4>
          <button type="button" class="review-edit-btn" data-goto-step="2">Edit</button>
        </div>
        <div class="review-row"><span>Description</span><span>${escapeHtml(state.description) || "—"}</span></div>
        <div class="review-row"><span>Primary Services</span><span>${escapeHtml(state.primaryServices) || "—"}</span></div>
        <div class="review-row"><span>Ideal Customers</span><span>${escapeHtml(state.idealCustomers) || "—"}</span></div>
        <div class="review-row"><span>Areas Served</span><span>${escapeHtml(state.areasServed) || "—"}</span></div>
      </div>
      <div class="review-section">
        <div class="review-section-head">
          <h4>Current Challenges</h4>
          <button type="button" class="review-edit-btn" data-goto-step="3">Edit</button>
        </div>
        <div class="review-row"><span>Selected</span><span>${challenges.length ? escapeHtml(challenges.join(", ")) : "—"}</span></div>
      </div>
      <div class="review-section">
        <div class="review-section-head">
          <h4>Business Goals</h4>
          <button type="button" class="review-edit-btn" data-goto-step="4">Edit</button>
        </div>
        <div class="review-row"><span>Selected</span><span>${goals.length ? escapeHtml(goals.join(", ")) : "—"}</span></div>
        <div class="review-row"><span>Additional Info</span><span>${escapeHtml(state.additionalInfo) || "—"}</span></div>
      </div>
    `;
  }

  function showStep(step) {
    stepPanels.forEach((panel) => {
      panel.classList.toggle("active", parseInt(panel.dataset.step, 10) === step);
    });

    prevBtn.hidden = step === 1;
    nextBtn.hidden = step === TOTAL_STEPS;
    submitBtn.hidden = step !== TOTAL_STEPS;
    submitBtn.disabled = !state.confirm;

    if (step === TOTAL_STEPS) renderReview();

    renderStepper();
    errorBox.classList.remove("visible");
  }

  function goToStep(step) {
    state.currentStep = Math.min(Math.max(step, 1), TOTAL_STEPS);
    saveState();
    showStep(state.currentStep);
    window.scrollTo({
      top: form.getBoundingClientRect().top + window.scrollY - 100,
      behavior: "smooth",
    });
  }

  nextBtn.addEventListener("click", () => {
    if (!validateStep(state.currentStep)) {
      errorBox.textContent = "Please complete the required fields before continuing.";
      errorBox.classList.add("visible");
      return;
    }
    goToStep(state.currentStep + 1);
  });

  prevBtn.addEventListener("click", () => {
    goToStep(state.currentStep - 1);
  });

  reviewSummary.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-goto-step]");
    if (!btn) return;
    goToStep(parseInt(btn.dataset.gotoStep, 10));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateStep(TOTAL_STEPS)) {
      errorBox.textContent = "Please confirm your information before submitting.";
      errorBox.classList.add("visible");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.querySelector("span").textContent = "Submitting...";

    const payload = Object.assign({ form_type: "assessment" }, state);
    delete payload.currentStep;
    delete payload.savedAt;

    try {
      const { error } = await supabaseClient.functions.invoke("send-contact-email", {
        body: payload,
      });
      if (error) throw error;

      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        /* ignore */
      }

      form.hidden = true;
      stepperEl.hidden = true;
      progressBarEl.hidden = true;
      stepIndicator.hidden = true;
      successBox.hidden = false;
      successBox.focus();
    } catch (err) {
      console.error(err);
      errorBox.textContent = "Unable to submit your assessment right now. Please try again shortly.";
      errorBox.classList.add("visible");
      submitBtn.disabled = false;
      submitBtn.querySelector("span").textContent = "Submit Assessment";
    }
  });

  populateForm();
  showStep(state.currentStep);
})();
