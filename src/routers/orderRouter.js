import express from "express";
import {
  verfyTokenAndAdmin,
  verfyTokenAndAuthorization,
  verifyToken,
} from "./verifyToken.js";
import Order from "../models/Order.js";
const router = express.Router();

//crate
router.post("/", verifyToken, async (req, res, next) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.json({
      status: "success",
      message: "Order saved",
      savedOrder,
    });
  } catch (error) {
    next(error);
  }
});

//delete

router.put("/:id", verfyTokenAndAdmin, async (req, res, next) => {
  try {
    const updatOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json({
      status: "success",
      message: "Order updated",
      updatOrder,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verfyTokenAndAdmin, async (req, res, next) => {
  try {
    awaitOrder.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "Order deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/find/:id", verfyTokenAndAuthorization, async (req, res, next) => {
  try {
    const order = await Order.findOne({ userId: req.params.userId });
    if (order?._id) {
      res.json({
        status: "success",
        message: "oreder Found",
        Order,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", verfyTokenAndAdmin, async (req, res, next) => {
  try {
    const orders = await Order.find();
    if (orders) {
      res.json({
        status: "success",
        message: "Order added",
        orders,
      });
    }
  } catch (error) {
    next(error);
  }
});
///
///get Monthly income

router.get("/income", verfyTokenAndAdmin, async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$created At" },
          sales: "$amount",
        },

        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.json({
      status: "success",
      income,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
