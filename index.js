// rzp_live_nxRkbDUeStVAQw;

// S8bF3NmGhzq9htGO6X5Ai9Fj; //key sec

const express = require("express");
const app = express();

const cors = require("cors");

const shortid = require("shortid");
const Razorpay = require("razorpay");

app.use(cors());

app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const razorpay = new Razorpay({
  key_id: "rzp_live_nxRkbDUeStVAQw",
  key_secret: "S8bF3NmGhzq9htGO6X5Ai9Fj",
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const currency = "INR";
  const options = {
    amount: req.body.amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/profile", function (req, res) {
  console.log(req.body.title);
  res.send();
});

app.listen(1337, () => {
  console.log("Backend running at localhost:1337");
});
