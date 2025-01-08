import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),

  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Please enter a valid phone number.",
  }),
});
