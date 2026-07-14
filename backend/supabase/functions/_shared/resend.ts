import { Resend } from "npm:resend";

import { buildContactClientEmail } from "./email/contact-client.ts";
import { buildContactAdminEmail } from "./email/contact-admin.ts";
import { buildAssessmentClientEmail } from "./email/assessment-client.ts";
import { buildAssessmentAdminEmail } from "./email/assessment-admin.ts";

import type { AssessmentNotification } from "./types.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const FROM_EMAIL = Deno.env.get("FROM_EMAIL")!;
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL")!;

// CLient notification for contact form ========>>
export async function sendClientConfirmation({
  firstName,
  email,
}: {
  firstName: string;
  email: string;
}) {
  const message = buildContactClientEmail({
    firstName,
  });

  return await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: message.subject,
    html: message.html,
  });
}

// Admin notification for contact form ========>>
export async function sendAdminNotification({
  firstName,
  lastName,
  business,
  email,
  phone,
  subject,
  message,
}: {
  firstName: string;
  lastName: string;
  business: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const notification = buildContactAdminEmail({
    firstName,
    lastName,
    business,
    email,
    phone,
    subject,
    message,
  });

  return await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: notification.subject,
    html: notification.html,
  });
}

// Client notification for assessment form ========>>
export async function sendAssessmentClientConfirmation({
  firstName,
  email,
}: {
  firstName: string;
  email: string;
}) {
  const message = buildAssessmentClientEmail({
    firstName,
  });

  return await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: message.subject,
    html: message.html,
  });
}

// Admin notification for assessment form ========>>

export async function sendAssessmentAdminNotification(
  assessment: AssessmentNotification,
) {
  const notification = buildAssessmentAdminEmail(assessment);

  return await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: notification.subject,
    html: notification.html,
  });
}
