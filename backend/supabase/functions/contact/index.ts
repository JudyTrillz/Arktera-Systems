import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { sendAdminNotification, sendClientConfirmation } from "../_shared/resend.ts";
import { insertContactSubmission } from "../_shared/database.ts";
import { optionsResponse, successResponse, errorResponse } from "../_shared/responses.ts";
import { contactSchema } from "../_shared/validation.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return optionsResponse();
  }

  try {
    if (req.method !== "POST") {
      return errorResponse("Method not allowed", 405);
    }

    const body = await req.json();

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return errorResponse(result.error.issues[0].message, 400);
    }

    const contact = result.data;

    const { data, error } = await insertContactSubmission({
      first_name: contact.first_name,
      last_name: contact.last_name,
      business: contact.business,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject,
      message: contact.message,
    });

    if (error) {
      console.error(error);

      return errorResponse(error.message, 500);
    }

    // Send confirmation email to client
    try {
      await sendClientConfirmation({
        firstName: contact.first_name,
        email: contact.email,
      });
    } catch (emailError) {
      console.error("Client email failed:", emailError);
    }

    // Send notification email to Arktera
    try {
      await sendAdminNotification({
        firstName: contact.first_name,
        lastName: contact.last_name,
        business: contact.business,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        message: contact.message,
      });
    } catch (emailError) {
      console.error("Admin email failed:", emailError);
    }

    return successResponse(data, "Contact form submitted successfully.", 201);
  } catch (err) {
    console.error(err);

    return errorResponse("Internal server error.", 500);
  }
});
