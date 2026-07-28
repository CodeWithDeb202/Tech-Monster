import { z } from "zod";

const studentInternshipSchema = z.object({

    student: z
        .string()
        .trim()
        .min(1, "Student ID is required"),

    internship: z
        .string()
        .trim()
        .min(1, "Internship ID is required"),

    completedTasks: z
        .coerce
        .number()
        .min(0)
        .default(0),

    progress: z
        .coerce
        .number()
        .min(0)
        .max(100)
        .default(0),

    status: z.enum([
        "Not Started",
        "In Progress",
        "Completed"
    ]).default("Not Started"),

    startedAt: z
        .string()
        .optional()
        .or(z.literal("")),

    completedAt: z
        .string()
        .optional()
        .or(z.literal("")),

    certificateIssued: z
        .boolean()
        .default(false)

});

export default studentInternshipSchema;