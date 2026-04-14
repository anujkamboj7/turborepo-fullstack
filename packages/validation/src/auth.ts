import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email").trim(),
  password: z.string().min(6, "Password must be at least 8 characters").trim(),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name is required").trim(),
    email: z.email("Invalid email").trim(),
    password: z
      .string()
      .min(6, "Password must be at least 8 characters")
      .trim(),
    confirmPassword: z
      .string()
      .min(6, "Confirm must be at least 8 characters")
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// optional: export types
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
