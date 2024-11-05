const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpayInstance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const createOrder = async (req, res) => {
  const { amount, userId } = req.body;
  try {
    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `receipt_order_${userId}`,
    };
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).send("Error creating Razorpay order");
  }
};


const verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature, userId, amount } = req.body;
  
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(order_id + "|" + payment_id)
      .digest("hex");
  
    if (generatedSignature === signature) {
      try {
        const payment = new Payment({
          orderId: order_id,
          paymentId: payment_id,
          signature: signature,
          userId: userId,
          amount: amount,
          currency: "INR",
          status: "Success",
        });
        await payment.save();
  
        res.send({ status: "Payment Verified and Saved" });
      } catch (error) {
        console.error("Error saving payment details:", error);
        res.status(500).send("Payment verified, but error saving details");
      }
    } else {
      res.status(400).send({ status: "Payment Verification Failed" });
    }
  };
  

module.exports = { createOrder, verifyPayment };
