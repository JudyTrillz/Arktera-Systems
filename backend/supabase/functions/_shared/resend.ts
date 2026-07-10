import { Resend } from "npm:resend";

import { env } from "../config/env.ts";
import { EmailOptions } from "./types.ts";

const resend = new Resend(env.resendApiKey);

/**
 * Sends an email using Resend.
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  const { error } = await resend.emails.send({
    from: env.fromEmail,
    to: options.to,
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
  });

  if (error) {
    throw new Error(error.message);
  }
}
