import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { sendAdminNotification, sendClientConfirmation } from "../_shared/resend.ts";
import { insertContactSubmission } from "../_shared/database.ts";
import { optionsResponse, successResponse, errorResponse } from "../_shared/responses.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return optionsResponse();
  }

  try {
    if (req.method !== "POST") {
      return errorResponse("Method not allowed", 405);
    }

    const body = await req.json();

    const { data, error } = await insertContactSubmission({
      first_name: body.first_name,
      last_name: body.last_name,
      business: body.business,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      message: body.message,
    });

    if (error) {
      console.error(error);

      return errorResponse(error.message, 500);
    }

    // Send confirmation email to client
    try {
      await sendClientConfirmation({
        firstName: body.first_name,
        email: body.email,
      });
    } catch (emailError) {
      console.error("Client email failed:", emailError);
    }

    // Send notification email to Arktera
    try {
      await sendAdminNotification({
        firstName: body.first_name,
        lastName: body.last_name,
        business: body.business,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
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
