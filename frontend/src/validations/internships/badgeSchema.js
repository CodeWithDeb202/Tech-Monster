import { z } from "zod";

const badgeSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3, "Badge title is required")
        .max(100),

    icon: z
        .string()
        .trim()
        .optional()
        .or(z.literal("")),

    description: z
        .string()
        .trim()
        .min(5, "Description is required")
        .max(500),

    color: z
        .string()
        .trim()
        .optional()
        .default("#FFD700"),

    requirement: z
        .string()
        .trim()
        .min(3, "Requirement is required")

});

export default badgeSchema;