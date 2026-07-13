import { Resend } from "npm:resend";
import { buildContactClientEmail } from "./email/contact-client.ts";
import { buildAssessmentClientEmail } from "./email/assessment-client.ts";

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
type AssessmentNotification = {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  website: string;
  businessLocation: string;
  industry: string;
  description: string;
  primaryServices: string;
  idealCustomers: string;
  areasServed: string;
  challenges: string[];
  otherChallenge?: string;
  goals: string[];
  otherGoal?: string;
  additionalInfo?: string;
};

export async function sendAssessmentAdminNotification(
  assessment: AssessmentNotification,
) {
  const {
    businessName,
    contactName,
    email,
    phone,
    website,
    businessLocation,
    industry,
    description,
    primaryServices,
    idealCustomers,
    areasServed,
    challenges,
    otherChallenge,
    goals,
    otherGoal,
    additionalInfo,
  } = assessment;

  return await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Business Growth Assessment: ${businessName}`,
    html: `
  <h2>New Business Growth Assessment</h2>

  <h3>Business Information</h3>

  <p><strong>Business:</strong> ${businessName}</p>

  <p><strong>Contact:</strong> ${contactName}</p>

  <p><strong>Email:</strong> ${email}</p>

  <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

  <p><strong>Website:</strong> ${website}</p>

  <p><strong>Location:</strong> ${businessLocation}</p>

  <p><strong>Industry:</strong> ${industry}</p>

  <hr>

  <h3>Business Overview</h3>

  <p><strong>Description</strong></p>
  <p>${description}</p>

  <p><strong>Primary Services</strong></p>
  <p>${primaryServices}</p>

  <p><strong>Ideal Customers</strong></p>
  <p>${idealCustomers}</p>

  <p><strong>Areas Served</strong></p>
  <p>${areasServed}</p>

  <hr>

  <h3>Current Challenges</h3>

  <p>${challenges.join(", ")}</p>

  ${
    otherChallenge
      ? `
<p><strong>Other Challenge</strong></p>

<p>${otherChallenge}</p>
`
      : ""
  }

  <hr>

  <h3>Business Goals</h3>

  <p>${goals.join(", ")}</p>

  ${
    otherGoal
      ? `
<p><strong>Other Goal</strong></p>

<p>${otherGoal}</p>
`
      : ""
  }

  <hr>

  <h3>Additional Information</h3>

  <p>${additionalInfo || "None provided"}</p>
`,
  });
}
