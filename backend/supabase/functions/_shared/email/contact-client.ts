import { emailLayout } from "./layout.ts";

export function buildContactClientEmail({ firstName }: { firstName: string }) {
  return {
    subject: "We've received your inquiry",

    html: emailLayout(`
      <h2 style="margin-top:0;">Hi ${firstName},</h2>

      <p>
        Thank you for contacting Arktera Systems.
      </p>

      <p>
        We've successfully received your inquiry and a member of our team will review it shortly.
      </p>

      <p>
        You can expect a response within one business day.
      </p>

      <p>
        We appreciate the opportunity to learn more about your business and look forward to speaking with you.
      </p>
    `),
  };
}
