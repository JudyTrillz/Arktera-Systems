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

export async function insertAssessmentSubmission(payload: {
  business_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  website: string;
  business_location: string;
  industry: string;
  description: string;
  primary_services: string;
  ideal_customers: string;
  areas_served: string;
  challenges: string[];
  other_challenge?: string;
  goals: string[];
  other_goal?: string;
  additional_info?: string;
}) {
  return await supabase.from("assessment_submissions").insert(payload).select().single();
}
