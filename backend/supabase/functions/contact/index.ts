import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Method not allowed",
        }),
        {
          status: 405,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const body = await req.json();

    const { data, error } = await supabase
      .from("contact_submissions")
      .insert({
        first_name: body.first_name,
        last_name: body.last_name,
        business: body.business,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
      })
      .select()
      .single();

    if (error) {
      console.error(error);

      return new Response(
        JSON.stringify({
          success: false,
          message: error.message,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact form submitted successfully.",
        data,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});
