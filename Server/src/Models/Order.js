import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size:String,
    color:String,
    quantity:{
        type:Number,
        required:true,
    }
  },
  { _id: false }
);

const OrderItems = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    OrderItems: [OrderSchema],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    paidAt: {
      type: Date,
    },

    isDelivered:{
        type:Boolean,
        required:false,
    },

    deliveredAt:{
        type:Date
    },

    paymentStatus: {
      type: String,
      default: "pending",
    },
    paymentDeatlis: {
      type: mongoose.Schema.Types.ObjectId,
    },
   status:{
    type:String,
    enum:["Processing",
        "shipped","Delivered","Cancelled"
    ],
    default:"Processing"
   },
  },
  { timestamps: true }
);

const Order= mongoose.model("Order", OrderItems);

export default Order;
