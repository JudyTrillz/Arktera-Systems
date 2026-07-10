/**
 * Database tables
 */
export const TABLES = {
  CONTACT_SUBMISSIONS: "contact_submissions",
  ASSESSMENT_SUBMISSIONS: "assessment_submissions",
} as const;

/**
 * Submission status values
 */
export const STATUS = {
  NEW: "new",
  REVIEWING: "reviewing",
  COMPLETED: "completed",
} as const;

/**
 * Submission sources
 */
export const SOURCES = {
  WEBSITE_CONTACT: "website-contact",
  WEBSITE_ASSESSMENT: "website-assessment",
} as const;

/**
 * Email subjects
 */
export const EMAIL_SUBJECTS = {
  CONTACT_CONFIRMATION: "We've received your enquiry | Arktera Systems",

  CONTACT_NOTIFICATION: "New Contact Form Submission",

  ASSESSMENT_CONFIRMATION: "We've received your Revenue Assessment",

  ASSESSMENT_NOTIFICATION: "New Revenue Assessment Submitted",
} as const;

/**
 * Validation rules
 */
export const VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,

  MAX_BUSINESS_LENGTH: 150,

  MAX_SUBJECT_LENGTH: 150,

  MAX_MESSAGE_LENGTH: 5000,
} as const;
