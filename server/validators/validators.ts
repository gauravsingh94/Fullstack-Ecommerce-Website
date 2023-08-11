import {z} from "zod";

// Validation for Signup Routes.
export const signupInput = z.object({
    username: z.string().min(3,"Username should be at least of 3 characters.").max(10,"Username should not increaes more than 10 characters."),
    password: z.string().min(8,"Password should be at least of 8 characters.").max(14,"Password should not increaes more than 14 characters."),
    firstName: z.string().min(2,"First name should be at least of 2 characters.").max(10,"First name should not increaes more than 10 characters."),
    lastName: z.string().min(2,"Last name should be at least of 2 characters.").max(10,"Last name should not increaes more than 10 characters."),
    phoneNo: z.string().min(10,"PhoneNo should be at least of 10 characters.").max(10,"PhoneNo should not increaes more than 10 characters."),
});

// Validation for Login Routes.
export const loginInput = z.object({
    username: z.string().min(3,"Username should be at least of 3 characters.").max(10,"Username should not increaes more than 10 characters."),
    password: z.string().min(8,"Password should be at least of 8 characters.").max(14,"Password should not increaes more than 14 characters."),
});