import { z } from "zod";

const internshipSchema = z.object({

    title:z.string().min(3),

    category:z.string().min(2),

    level:z.enum([
        "Beginner",
        "Intermediate",
        "Advanced"
    ]),

    description:z.string().min(20),

    thumbnail:z.string().optional(),

    duration:z.coerce.number().min(1),

    totalTasks:z.coerce.number().min(1),

    totalNotes:z.coerce.number().min(1),

    certificate:z.boolean(),

    badge:z.boolean()

});

export default internshipSchema;