import { z } from "zod";

/**
 * Contact form schema. Used by both the client form (for inline validation)
 * and any server action that handles the submission.
 */
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Enter a valid email").max(200),
  company: z.string().max(200).optional(),
  projectType: z.enum(["rag", "agent", "eval", "mlops", "strategy", "other"], {
    errorMap: (issue, ctx) => ({
      message: issue.code === "invalid_enum_value" ? "Select a project type" : ctx.defaultError,
    }),
  }),
  message: z
    .string()
    .min(20, "Tell us a bit more (20+ characters)")
    .max(2000, "Keep it under 2000 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please accept the privacy policy" }),
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email").max(200),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
