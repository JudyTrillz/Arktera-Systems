// Setup type definitions for Supabase Edge Runtime
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { withSupabase } from "@supabase/server";

import { corsHeaders } from "../_shared/cors.ts";
import { successResponse, errorResponse } from "../_shared/responses.ts";
import { validateContactSubmission } from "../_shared/validation.ts";
import { ContactEmails } from "../emails/contact.ts";

console.info("Contact Form Edge Function started");

export default {
  fetch: withSupabase(
    {
      auth: false,
    },

    async (req, ctx) => {
      // Everything else will go here.
    },
  ),
};
