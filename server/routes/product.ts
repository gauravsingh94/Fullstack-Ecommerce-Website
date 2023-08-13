import express, { Request, Response } from "express";
import { authenticateJWTany } from "../middlewares/authenticate";
import Product from "../model/Product";

const router = express.Router();

router.get("/", authenticateJWTany, async(req: Request, res: Response) => {
  try {
    const allProducts = await Product.find({});
    if (!allProducts) {
      res.json({ message: "There is not products." });
    }
    res.json(allProducts);
  } catch (error) {
    res.json({ error: error });
  }
});

router.get("/:id", authenticateJWTany, async(req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await Product.find({_id:productId});
    if (!product) {
      res.json({ message: "There is not products." });
    }
    res.json(product);
  } catch (error) {
    res.json({ error: error });
  }
});

export default router;