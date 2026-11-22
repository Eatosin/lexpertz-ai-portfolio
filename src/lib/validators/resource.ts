import { z } from "zod";

/** Lead form for the RAG Permission Test Kit. */
export const resourceSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Enter a valid email").max(200),
  company: z.string().max(200).optional(),
  consent: z.boolean().refine((value) => value === true, {
    message: "Please accept the privacy policy",
  }),
});

export type ResourceInput = z.infer<typeof resourceSchema>;
