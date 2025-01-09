import { z } from "zod";

export const UserFormValidation = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z
    .string()
    // .max(13)
    .refine((value) => /^\+?[1-9]\d{1,14}$/.test(value), {
      message: "Please enter a valid phone number.",
    }),
  // birthDate: z.date({
  //   message: "Please enter a valid date of birth.",
  // }),
});
