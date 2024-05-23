import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required.").max(255),
  username: z.string().min(1, "Username is required.").max(255),
  password: z.string().min(1, "Name is required.").max(255),
  role: z
    .enum(["ADMIN", "VETINARY", "ASSISTANT", "USER"])
    .optional()
    .refine((value) => value !== undefined, {
      message: "ROLE is required.",
      path: ["role"],
    }),
});
