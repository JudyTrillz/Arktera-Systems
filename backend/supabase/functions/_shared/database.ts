import { createClient } from "npm:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

export async function insertContactSubmission(payload: {
  first_name: string;
  last_name: string;
  business: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  return await supabase.from("contact_submissions").insert(payload).select().single();
}
