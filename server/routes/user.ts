import express, { Request, Response } from "express";
import {
  authenticateJWTuser,
  generateJWTuser,
} from "../middlewares/authenticate";
import User from "../model/User";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { signupInput, loginInput } from "../validators/validators";

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
  const user = await User.findOne({ username: parsedInput.data.username });
  const plainPassword = parsedInput.data.password;
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    if (user) {
      res.status(409).json({ error: "User already exists." });
    } else {
      const newUser = new User({
        username: parsedInput.data.username,
        password: hashedPassword,
        firstName: parsedInput.data.firstName,
        lastName: parsedInput.data.lastName,
        phoneNo: parsedInput.data.phoneNo,
      });
      await newUser.save();
      const userId = newUser._id.toString();
      const token = generateJWTuser(userId);
      res.json({ message: "User signup successfully.", token: token });
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
    const user = await User.findOne({ username: parsedInput.data.username });
    if (user && user.password) {
      const isValid = await bcrypt.compare(plainPassword, user.password);
      if (isValid) {
        const userId = user._id.toString();
        const token = generateJWTuser(userId);
        res.json({ message: "User Login successfully.", token: token });
      }else{
        res.status(401).json({error: "Unauthorized, Password is incorrect"})
      }

    } else {
      res.status(401).json({ error: "Unauthorized, Username is incorrect" });
    }
  } catch (error) {
    console.error("Error while encrypting the password.");
    res.status(500).json({ error: "Error while encrypting the password." });
  }
});

router.get("/me",authenticateJWTuser,async(req: Request, res: Response)=>{
  const userId = req.headers.userId;
  const user = await User.findOne({ _id: userId});
  if(user){
    res.send(user);
  }
  else{
    res.status(404).json({message:"User not found"});
  }
})

export default router;
