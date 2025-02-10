import mongoose from "mongoose";

// Schema for individual checkout items
const CheckoutSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Supports multiple images
    required: true
  },
  price: {
    type: Number,
    required: true,
  }
});

// Main checkout schema
const CheckoutItemsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checkoutItems: [CheckoutSchema], // Corrected array name
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  isPaid: {
    type: Boolean,
    required: false,
  },
  paidAt: {
    type: Date
  },
  paymentStatus: {
    type: String,
    default: "pending"
  },
  paymentDetails: { // Fixed typo from `paymentDeatlis`
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment"
  },
  isFinalized: {
    type: Boolean,
    default: false
  },
  finalizedAt: { 
    type: Date
  }
}, { timestamps: true });

const Checkout = mongoose.model("Checkout", CheckoutItemsSchema);

export default Checkout;
