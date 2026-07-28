import { z } from "zod";

/*
=========================================
Education Schema
=========================================
*/

const educationSchema = z.object({

    degree: z
        .string()
        .trim()
        .min(2, "Degree is required"),

    institute: z
        .string()
        .trim()
        .min(2, "Institute name is required"),

    fieldOfStudy: z
        .string()
        .trim()
        .optional(),

    startYear: z.coerce
        .number()
        .min(1950)
        .max(new Date().getFullYear()),

    endYear: z.coerce
        .number()
        .min(1950)
        .max(2100),

    percentage: z
        .string()
        .optional(),

});

/*
=========================================
Experience Schema
=========================================
*/

const experienceSchema = z.object({

    company: z
        .string()
        .trim()
        .min(2, "Company name required"),

    role: z
        .string()
        .trim()
        .min(2, "Role required"),

    employmentType: z
        .string()
        .optional(),

    location: z
        .string()
        .optional(),

    startDate: z
        .string()
        .optional(),

    endDate: z
        .string()
        .optional(),

    currentlyWorking: z
        .boolean()
        .default(false),

    description: z
        .string()
        .max(1000)
        .optional(),

});

/*
=========================================
Social Links
=========================================
*/

const socialSchema = z.object({

    linkedin: z
        .string()
        .url("Invalid LinkedIn URL")
        .optional()
        .or(z.literal("")),

    github: z
        .string()
        .url("Invalid GitHub URL")
        .optional()
        .or(z.literal("")),

    portfolio: z
        .string()
        .url("Invalid Portfolio URL")
        .optional()
        .or(z.literal("")),

    leetcode: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

    hackerrank: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

    codechef: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

    codeforces: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

    behance: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

    dribbble: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

    twitter: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

    instagram: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

    youtube: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),

});

/*
=========================================
Main Profile Schema
=========================================
*/

const profileSchema = z.object({

    firstName: z
        .string()
        .trim()
        .min(2, "First name required"),

    lastName: z
        .string()
        .trim()
        .min(2, "Last name required"),

    phone: z
        .string()
        .regex(
            /^[6-9]\d{9}$/,
            "Invalid phone number"
        )
        .optional()
        .or(z.literal("")),

    gender: z.enum([
        "male",
        "female",
        "other"
    ]).optional(),

    dob: z
        .string()
        .optional(),

    bio: z
        .string()
        .max(500)
        .optional(),

    location: z
        .string()
        .optional(),

    skills: z
        .array(z.string())
        .default([]),

    languages: z
        .array(z.string())
        .default([]),

    preferredTechnologies: z
        .array(z.string())
        .default([]),

    skillLevel: z
        .string()
        .optional(),

    education: z
        .array(educationSchema)
        .default([]),

    experience: z
        .array(experienceSchema)
        .default([]),

    socialLinks: socialSchema
        .default({}),

});

export default profileSchema;