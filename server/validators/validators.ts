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

//Validation for Products 
export const productInput = z.object({
    name: z.string().min(1,"Product name should be at least of 1 characters.").max(15,"Product name should not increaes more than 15 characters."),
    description: z.string().min(4,"Product name should be at least of 4 characters.").max(50,"Product name should not increaes more than 50 characters."),
    price: z.string().min(1,"Price should be at least of 1 digits.").max(15,"Price  should not increaes more than 15 characters."),
    stock: z.number().min(0,"Stock show be 0 or more than 0.").max(100000000),
    images: z.array(z.string()).min(1,"At lest one image of the product is required."),
});

export const productInputUpdate = z.object({
    name: z.string().min(1,"Product name should be at least of 1 characters.").max(15,"Product name should not increaes more than 15 characters.").optional(),
    description: z.string().min(4,"Product name should be at least of 4 characters.").max(50,"Product name should not increaes more than 50 characters.").optional(),
    price: z.string().min(1,"Price should be at least of 1 digits.").max(15,"Price  should not increaes more than 15 characters.").optional(),
    stock: z.number().min(0,"Stock show be 0 or more than 0.").max(100000000).optional(),
    images: z.array(z.string()).min(1,"At lest one image of the product is required.").optional(),
});

export const categoryInputUpdate = z.object({
    name: z.string().min(1,"Category name should be at least of 1 characters.").max(15,"Category name should not increaes more than 15 characters.").optional(),
    description: z.string().min(4,"Category name should be at least of 4 characters.").max(50,"Category name should not increaes more than 50 characters.").optional(),
});