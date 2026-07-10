import { ValidationResult } from "./types.ts";

/**
 * Removes leading/trailing whitespace.
 */
export function sanitize(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

/**
 * Checks that a required value exists.
 */
export function isRequired(value: unknown): boolean {
  return sanitize(value).length > 0;
}

/**
 * Validates email addresses.
 */
export function isEmail(value: unknown): boolean {
  const email = sanitize(value);

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Basic international phone validation.
 * Accepts spaces, +, -, parentheses.
 */
export function isPhone(value: unknown): boolean {
  const phone = sanitize(value);

  if (!phone) return true;

  return /^[+\d\s()-]{7,20}$/.test(phone);
}

/**
 * Checks minimum string length.
 */
export function minLength(value: unknown, length: number): boolean {
  return sanitize(value).length >= length;
}

/**
 * Checks maximum string length.
 */
export function maxLength(value: unknown, length: number): boolean {
  return sanitize(value).length <= length;
}

/**
 * Creates a validation result object.
 */
export function createValidationResult<T>(
  data?: T,
  errors: Record<string, string> = {},
): ValidationResult<T> {
  return {
    valid: Object.keys(errors).length === 0,
    data,
    errors,
  };
}

export function validateContactSubmission(payload: Record<string, unknown>) {
  const errors: Record<string, string> = {};

  const data = {
    first_name: sanitize(payload.first_name),
    last_name: sanitize(payload.last_name),
    business: sanitize(payload.business),
    email: sanitize(payload.email),
    phone: sanitize(payload.phone),
    subject: sanitize(payload.subject),
    message: sanitize(payload.message),
  };

  if (!isRequired(data.first_name)) {
    errors.first_name = "First name is required.";
  }

  if (!isRequired(data.last_name)) {
    errors.last_name = "Last name is required.";
  }

  if (!isRequired(data.business)) {
    errors.business = "Business name is required.";
  }

  if (!isRequired(data.email)) {
    errors.email = "Email address is required.";
  } else if (!isEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!isPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!isRequired(data.subject)) {
    errors.subject = "Subject is required.";
  }

  if (!isRequired(data.message)) {
    errors.message = "Message is required.";
  } else if (!minLength(data.message, 10)) {
    errors.message = "Message must be at least 10 characters.";
  }

  return createValidationResult(data, errors);
}
