import {z} from "zod";

export const signupSchema = z.object({
    name : z.string().min(3, "name must be greater 3"),
    email : z.string().email("invalid format"),
    password : z.string(6, "must be 6 or greater")
});

export const signinSchema = z.object({
    email : z.string().email("invalid format"),
    password : z.string(6, "must be 6 or greater")
});
