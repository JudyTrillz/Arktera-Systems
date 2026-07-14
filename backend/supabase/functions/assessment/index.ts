import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  sendAssessmentAdminNotification,
  sendAssessmentClientConfirmation,
} from "../_shared/resend.ts";
import { insertAssessmentSubmission } from "../_shared/database.ts";
import { optionsResponse, successResponse, errorResponse } from "../_shared/responses.ts";
import { assessmentSchema } from "../_shared/validation.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return optionsResponse();
  }

  try {
    if (req.method !== "POST") {
      return errorResponse("Method not allowed", 405);
    }

    const body = await req.json();

    const result = assessmentSchema.safeParse(body);

    if (!result.success) {
      return errorResponse(result.error.issues[0].message, 400);
    }

    const contact = result.data;

    const { data, error } = await insertAssessmentSubmission({
      business_name: contact.business_name,
      contact_name: contact.contact_name,
      email: contact.email,
      phone: contact.phone,
      website: contact.website,
      business_location: contact.business_location,
      industry: contact.industry,
      description: contact.description,
      primary_services: contact.primary_services,
      ideal_customers: contact.ideal_customers,
      areas_served: contact.areas_served,
      challenges: contact.challenges,
      other_challenge: contact.other_challenge,
      goals: contact.goals,
      other_goal: contact.other_goal,
      additional_info: contact.additional_info,
    });

    if (error) {
      console.error(error);

      return errorResponse(error.message, 500);
    }

    // Send confirmation email to client
    try {
      await sendAssessmentClientConfirmation({
        firstName: contact.contact_name,
        email: contact.email,
      });
    } catch (emailError) {
      console.error("Assessment client email failed:", emailError);
    }

    // Send notification email to Arktera
    try {
      await sendAssessmentAdminNotification({
        businessName: contact.business_name,
        contactName: contact.contact_name,
        email: contact.email,
        phone: contact.phone,
        website: contact.website,
        businessLocation: contact.business_location,
        industry: contact.industry,
        description: contact.description,
        primaryServices: contact.primary_services,
        idealCustomers: contact.ideal_customers,
        areasServed: contact.areas_served,
        challenges: contact.challenges,
        otherChallenge: contact.other_challenge,
        goals: contact.goals,
        otherGoal: contact.other_goal,
        additionalInfo: contact.additional_info,
      });
    } catch (emailError) {
      console.error("Assessment admin email failed:", emailError);
    }

    return successResponse(data, "Assessment form submitted successfully.", 201);
  } catch (err) {
    console.error(err);

    return errorResponse("Internal server error.", 500);
  }
});
