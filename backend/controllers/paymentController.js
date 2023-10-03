
const asyncErrors = require("../middleware/asyncErrors");

const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

exports.processPayment = asyncErrors(async  (req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"HEIL",
        },
    });
    res.status(200).json({success:true,client_secret:myPayment.client_secret});
});

exports.sendStripeApiKey = asyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  });