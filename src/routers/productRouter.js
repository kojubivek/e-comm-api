import express from "express";
import {
  verfyTokenAndAdmin,
  verfyTokenAndAuthorization,
  verifyToken,
} from "./verifyToken.js";
import Product from "../models/Product.js";

const router = express.Router();

//crate
router.post("/", verfyTokenAndAdmin, async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.json({
      status: "success",
      message: "product saved",
      savedProduct,
    });
  } catch (error) {
    next(error);
  }
});

//delete
router.delete("/:id", verfyTokenAndAdmin, async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "product deleted",
    });
  } catch (error) {
    next(error);
  }
});

//get product
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product?._id) {
      res.json({
        status: "success",
        message: "userFound",
        product,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }.limit(5));
    } else if (qCategory) {
      products = await Product.find({
        caregories: { $in: [qCategory] },
      });
    } else {
      products = await products.find();
    }
  } catch (error) {}
});
router.put("/:id", verfyTokenAndAdmin, async (req, res, next) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json({
      status: "success",
      message: "product updated",
      updateProduct,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
