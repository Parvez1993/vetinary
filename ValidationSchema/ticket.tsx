import { z } from "zod";

export const TicketSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z
    .string()
    .min(1, "Description must be at least 1 character long.")
    .max(65535),
  status: z
    .enum(["OPEN", "STARTED", "CLOSED", "CANCELLED"])
    .optional()
    .refine((value) => value !== undefined, {
      message: "Status is required.",
      path: ["status"],
    }),
  priority: z
    .enum(["HIGH", "LOW", "MEDIUM"])
    .optional()
    .refine((value) => value !== undefined, {
      message: "Priority is required.",
      path: ["priority"],
    }),
  animal: z
    .enum(["CAT", "DOG", "BIRD", "COW", "GOAT"])
    .optional()
    .refine((value) => value !== undefined, {
      message: "Animal is required.",
      path: ["animal"],
    }),
  price: z
    .number()
    .min(0, "Price must be at least 0.")
    .max(1000000, "Price must be less than 1,000,000.")
    .refine((value) => Number.isFinite(value), {
      message: "Price must be a valid number.",
      path: ["price"],
    }),
  appointment: z.coerce.date(),
});

export const TicketPatchSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  status: z.string().min(1, "Status").max(10).optional(),
  priority: z.string().min(1, "Priority").max(10).optional(),
  animal: z.string().min(1, "Priority").max(10).optional(),
  price: z
    .number()
    .min(0, "Price must be at least 0.")
    .max(1000000, "Price must be less than 1,000,000.")
    .refine((value) => Number.isFinite(value), {
      message: "Price must be a valid number.",
      path: ["price"],
    })
    .optional(),
  appointment: z.coerce.date().optional(),
});
