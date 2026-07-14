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

// Assessment schema for the 5-step assessment form =====>>
export const assessmentSchema = z.object({
  business_name: z.string().trim().min(1, "Business name is required"),

  contact_name: z.string().trim().min(1, "Your name is required"),

  email: z.string().trim().email("A valid email address is required"),

  phone: z.string().optional(),

  website: z
    .string()
    .trim()
    .transform((value) => {
      if (!value) return "";
      return /^https?:\/\//i.test(value) ? value : `https://${value}`;
    })
    .refine((value) => value === "" || z.string().url().safeParse(value).success, {
      message: "A valid website URL is required",
    }),

  business_location: z.string().trim().min(1, "Business location is required"),

  industry: z.string().trim().min(1, "Industry is required"),

  description: z.string().trim().min(1, "Business description is required"),

  primary_services: z.string().trim().min(1, "Primary services are required"),

  ideal_customers: z.string().trim().min(1, "Ideal customers are required"),

  areas_served: z.string().trim().min(1, "Areas served are required"),

  challenges: z.array(z.string()).min(1, "Select at least one challenge"),

  other_challenge: z.string().optional(),

  goals: z.array(z.string()).min(1, "Select at least one goal"),

  other_goal: z.string().optional(),

  additional_info: z.string().optional(),
});
