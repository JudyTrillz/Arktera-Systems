import { Resend } from "npm:resend";

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
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Contact Form Submission: ${subject}`,
    html: `
  <h2>New Contact Form Submission</h2>

  <p><strong>Name:</strong> ${firstName} ${lastName}</p>

  <p><strong>Business:</strong> ${business}</p>

  <p><strong>Email:</strong> ${email}</p>

  <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

  <p><strong>Subject:</strong> ${subject}</p>

  <hr>

  <h3>Message</h3>

  <p>${message.replace(/\n/g, "<br>")}</p>
`,
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
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "We've received your business growth assessment",
    html: `
      <h2>Hi ${firstName},</h2>

      <p>Thanks for completing the Arktera Systems Business Growth Assessment.</p>

      <p>
        We've received your responses and our team will review your business
        goals, challenges, and current growth opportunities.
      </p>

      <p>
        You can expect to hear from us within one business day with the next steps.
      </p>

      <br>

      <p>Arktera Systems</p>
    `,
  });
}

// Admin notification for assessment form ========>>
export async function sendAssessmentAdminNotification({
  businessName,
  contactName,
  email,
  phone,
  website,
  industry,
  challenges,
  goals,
}: {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  website: string;
  industry: string;
  challenges: string[];
  goals: string[];
}) {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Business Growth Assessment: ${businessName}`,
    html: `
      <h2>New Business Growth Assessment</h2>

      <p><strong>Business:</strong> ${businessName}</p>

      <p><strong>Contact:</strong> ${contactName}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

      <p><strong>Website:</strong> ${website}</p>

      <p><strong>Industry:</strong> ${industry}</p>

      <hr>

      <h3>Challenges</h3>
      <p>${challenges.join(", ")}</p>

      <h3>Goals</h3>
      <p>${goals.join(", ")}</p>
    `,
  });
}
