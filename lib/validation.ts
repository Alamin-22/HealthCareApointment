import { z } from "zod";

const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),
  email: z.string().email("Invalid Email Address"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+?[1-9]\d{1,14}$/.test(phone),
      "Invalid Phone number"
    ),
});

export default UserFormValidation;
