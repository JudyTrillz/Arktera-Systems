import { ContactSubmission } from "./types.ts";

export interface ValidationResult {
  valid: boolean;
  data?: ContactSubmission;
  errors?: Record<string, string>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactSubmission(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return {
      valid: false,
      errors: {
        form: "Invalid request body.",
      },
    };
  }

  const payload = body as Record<string, unknown>;

  const first_name = String(payload.first_name ?? "").trim();
  const last_name = String(payload.last_name ?? "").trim();
  const business = String(payload.business ?? "").trim();
  const email = String(payload.email ?? "")
    .trim()
    .toLowerCase();
  const phone = String(payload.phone ?? "").trim();
  const subject = String(payload.subject ?? "").trim();
  const message = String(payload.message ?? "").trim();

  const errors: Record<string, string> = {};

  if (!first_name) errors.first_name = "First name is required.";

  if (!last_name) errors.last_name = "Last name is required.";

  if (!business) errors.business = "Business name is required.";

  if (!email) errors.email = "Email address is required.";
  else if (!EMAIL_REGEX.test(email)) errors.email = "Please enter a valid email address.";

  if (!subject) errors.subject = "Subject is required.";

  if (!message) errors.message = "Message is required.";

  if (Object.keys(errors).length > 0) {
    return {
      valid: false,
      errors,
    };
  }

  return {
    valid: true,
    data: {
      first_name,
      last_name,
      business,
      email,
      phone: phone || null,
      subject,
      message,
    },
  };
}
