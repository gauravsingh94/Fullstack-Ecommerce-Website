import express, { Request, Response } from "express";
import {
  authenticateJWTadmin,
  generateJWTadmin,
} from "../middlewares/authenticate";
import Admin from "../model/Admin";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {
  signupInput,
  loginInput,
  productInput,
  productInputUpdate,
  categoryInputUpdate,
} from "../validators/validators";
import Product from "../model/Product";
import { Category, CategoryDocument } from "../model/Category";

dotenv.config();
const router = express.Router();

//Salt for bcrypt
const saltRounds = parseInt(process.env.SALT_ROUNDS!);

router.post("/signup", async (req: Request, res: Response) => {
  const parsedInput = signupInput.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({ error: parsedInput.error.issues[0] });
    return;
  }
  const admin = await Admin.findOne({ username: parsedInput.data.username });
  const plainPassword = parsedInput.data.password;
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    if (admin) {
      res.status(409).json({ error: "Admin already exists." });
    } else {
      const newAdmin = new Admin({
        username: parsedInput.data.username,
        password: hashedPassword,
        firstName: parsedInput.data.firstName,
        lastName: parsedInput.data.lastName,
        phoneNo: parsedInput.data.phoneNo,
      });
      await newAdmin.save();
      const adminId = newAdmin._id.toString();
      const token = generateJWTadmin(adminId);
      res.json({ message: "Admin signup successfully.", token: token });
    }
  } catch (error) {
    console.error("Error while encrypting the password.");
    res.status(500).json({ error: "Error while encrypting the password." });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const parsedInput = loginInput.safeParse(req.headers);
  if (!parsedInput.success) {
    res.status(411).json({ error: parsedInput.error.issues[0] });
    return;
  }
  const plainPassword = parsedInput.data.password;
  try {
    const admin = await Admin.findOne({ username: parsedInput.data.username });
    if (admin && admin.password) {
      const isValid = await bcrypt.compare(plainPassword, admin.password);
      if (isValid) {
        const adminId = admin._id.toString();
        const token = generateJWTadmin(adminId);
        res.json({ message: "Admin Login successfully.", token: token });
      } else {
        res.status(401).json({ error: "Unauthorized, Password is incorrect" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized, Adminname is incorrect" });
    }
  } catch (error) {
    console.error("Error while encrypting the password.");
    res.status(500).json({ error: "Error while encrypting the password." });
  }
});

router.post(
  "/products",
  authenticateJWTadmin,
  async (req: Request, res: Response) => {
    try {
      const parsedInput = productInput.safeParse(req.body);
      if (!parsedInput.success) {
        res.status(411).json({ error: parsedInput.error.issues[0] });
        return;
      }
      const productData = parsedInput.data;
      const newProduct = new Product(productData);
      await newProduct.save();
      res.json({ message: "Product added successfully." });
    } catch (error) {
      res.json({ error: "Failed adding the product." });
      console.log(error);
    }
  }
);

router.put(
  "/products/:id",
  authenticateJWTadmin,
  async (req: Request, res: Response) => {
    try {
      const parsedInput = productInputUpdate.safeParse(req.body);
      if (!parsedInput.success) {
        res.status(411).json({ error: parsedInput.error.issues[0] });
        return;
      }
      const productId = req.params.id;
      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: productId },
        parsedInput.data
      );
      if (!updatedProduct) {
        res.json({ message: "Not able to update the Product." });
      }
      res.json({ message: "Product updated successfully." });
    } catch (error) {
      res.json({ error: "Failed updating the product." });
      console.log(error);
    }
  }
);

router.delete(
  "/products/:id",
  authenticateJWTadmin,
  async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      const deletedCourse = await Product.findByIdAndDelete({ _id: productId });
      if (!deletedCourse) {
        res.json({ message: "Failed delete course." });
      }
      res.json({ message: "Course deleted successfully." });
    } catch (error) {
      res.json({ error: "Failed while deleting." });
    }
  }
);

router.post(
  "/category",
  authenticateJWTadmin,
  async (req: Request, res: Response) => {
    try {
      const parsedInput = categoryInputUpdate.safeParse(req.body);
      if (parsedInput.success) {
        const newCategoryData: Partial<CategoryDocument> = parsedInput.data;
        const newCategory = new Category(newCategoryData);
        await newCategory.save();
        res.json({ message: "Category added successfully." });
      }
      else{
        res.json({ error: parsedInput.error.issues[0] });
      }
    } catch (error) {
      res.json({ error: error });
    }
  }
);

export default router;
