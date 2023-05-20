import express from "express";
import {
  verfyTokenAndAdmin,
  verfyTokenAndAuthorization,
  verifyToken,
} from "./verifyToken.js";
import User from "../models/User.js";

const router = express.Router();

router.put("/:id", verfyTokenAndAuthorization, async (req, res, next) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.Pass_KEY
    ).toString();
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json({
      status: "status",
      message: "user updated",
      updateUser,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verfyTokenAndAuthorization, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "user deleted",
    });
  } catch (error) {
    next(error);
  }
});

//get
router.get("/:id", verfyTokenAndAdmin, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user?._id) {
      res.json({
        status: "success",
        message: "userFound",
        user,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
