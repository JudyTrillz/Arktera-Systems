import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const FROM_EMAIL = Deno.env.get("FROM_EMAIL")!;
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL")!;

export async function sendClientConfirmation({
  firstName,
  email,
}: {
  firstName: string;
  email: string;
}) {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "We've received your inquiry",
    html: `
      <h2>Hi ${firstName},</h2>

      <p>Thanks for contacting Arktera Systems.</p>

      <p>We've received your inquiry and will review it shortly.</p>

      <p>You can expect a response within one business day.</p>

      <br>

      <p>Arktera Systems</p>
    `,
  });
}

export async function sendAdminNotification({
  firstName,
  lastName,
  business,
  email,
  subject,
}: {
  firstName: string;
  lastName: string;
  business: string;
  email: string;
  subject: string;
}) {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <h2>New Contact Submission</h2>

      <p><strong>Name:</strong> ${firstName} ${lastName}</p>

      <p><strong>Business:</strong> ${business}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Subject:</strong> ${subject}</p>
    `,
  });
}
