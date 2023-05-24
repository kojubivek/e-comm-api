import express from "express";
import stripe from "stripe";
const router = express.Router();

const stripeFun = stripe(process.env.STRIPE_KEY);

router.get("/payment", (req, res, next) => {
  res.json({
    status: "success",
    message: "payment",
  });
});
router.post("/payment", (req, res, next) => {
  stripeFun.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "aud",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        next(error);
      } else {
        res.json({
          status: "success",
          message: "payment succesfull",
          stripeRes,
        });
      }
    }
  );
});

export default router;
