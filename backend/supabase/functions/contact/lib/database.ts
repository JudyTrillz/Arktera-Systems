import type { ContactSubmission } from "./types.ts";

export async function saveContactSubmission(
  supabase: any,
  submission: ContactSubmission,
) {
  const { data, error } = await supabase
    .from("contact_submissions")
    .insert(submission)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
