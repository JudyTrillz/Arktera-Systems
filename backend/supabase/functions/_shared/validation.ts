import { z } from "npm:zod";

export const contactSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),
  last_name: z.string().trim().min(1, "Last name is required"),
  business: z.string().trim().min(1, "Business name is required"),
  email: z.string().trim().email("A valid email address is required"),
  phone: z.string().optional(),
  subject: z.string().trim().min(1, "Subject is required"),
  message: z.string().trim().min(1, "Message is required"),
});
