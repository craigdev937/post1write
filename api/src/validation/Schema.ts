import { z } from "zod";

export const RSchema = z.object({
    username: z.string().trim().min(3).max(120, {
        message: "Username must be 120 or Less!"
    }),
    email: z.email().trim().min(3, {
        message: "Email is Required!"
    }),
    password: z.string().trim().min(6, {
        message: "Must be at Least 6 Chracters!"
    }),
});

export type RType = z.infer<typeof RSchema>;

export const LSchema = z.object({
    email: z.email().trim().min(3, {
        message: "Email is Required!"
    }),
    password: z.string().trim().min(6, {
        message: "Must be at Least 6 Chracters!"
    }),
});

export type LType = z.infer<typeof LSchema>;

export const SSchema = z.object({
    author_id: z.number(),
    title: z.string()
        .min(1, "Title is Required!")
        .max(255, "Title is MAX 255 characters"),
    text: z.string()
        .min(1, "Text is Required!")
        .max(50_000, "Text is too long")
});

export type SType = z.infer<typeof SSchema>;



