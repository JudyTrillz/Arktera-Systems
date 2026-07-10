import { buildEmailLayout } from "../_shared/email-layout.ts";

interface ContactConfirmationData {
  firstName: string;
}

interface ContactNotificationData {
  firstName: string;
  lastName: string;
  business: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const ContactEmails = {
  confirmation(data: ContactConfirmationData) {
    return buildEmailLayout({
      title: "We've Received Your Enquiry",
      heading: "Thanks for contacting Arktera",
      content: `
        <p>Hi ${data.firstName},</p>

        <p>
          Thank you for getting in touch with Arktera Systems.
        </p>

        <p>
          We've received your enquiry and a member of our team will review it
          shortly.
        </p>

        <p>
          You can expect a response within one business day.
        </p>

        <p>
          We appreciate you taking the time to reach out and look forward to
          speaking with you.
        </p>
      `,
    });
  },

  notification(data: ContactNotificationData) {
    return buildEmailLayout({
      title: "New Contact Form Submission",
      heading: "New Website Enquiry",
      content: `
        <table style="width:100%;border-collapse:collapse;">

          <tr>
            <td><strong>Name</strong></td>
            <td>${data.firstName} ${data.lastName}</td>
          </tr>

          <tr>
            <td><strong>Business</strong></td>
            <td>${data.business}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>${data.email}</td>
          </tr>

          <tr>
            <td><strong>Phone</strong></td>
            <td>${data.phone || "-"}</td>
          </tr>

          <tr>
            <td><strong>Subject</strong></td>
            <td>${data.subject}</td>
          </tr>

        </table>

        <h3 style="margin-top:32px;">
          Message
        </h3>

        <p style="white-space:pre-line;">
          ${data.message}
        </p>
      `,
    });
  },
};
