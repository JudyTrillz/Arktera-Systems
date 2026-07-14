export function buildContactAdminEmail({
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
  return {
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
  };
}
