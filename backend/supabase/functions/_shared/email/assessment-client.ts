import { emailLayout } from "./layout.ts";

export function buildAssessmentClientEmail({ firstName }: { firstName: string }) {
  return {
    subject: "We've received your Business Growth Assessment",

    html: emailLayout(`
      <h2 style="margin-top:0;">Hi ${firstName},</h2>

      <p>
        Thank you for completing the Arktera Systems Business Growth Assessment.
      </p>

      <p>
        We've successfully received your responses and will review your business,
        current challenges, and growth opportunities.
      </p>

      <p>
        One of our team members will review everything you've shared and get back
        to you within one business day with the next steps.
      </p>

      <p>
        We appreciate the opportunity to learn more about your business and look
        forward to speaking with you.
      </p>
    `),
  };
}
