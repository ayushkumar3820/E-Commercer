import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number, 
      required: true,
    },
    discountPrice: {
      type: Number,  
    },
    countInStock: {
      type: Number,  
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      required: true,
    },
    category: {
      type: String,  // ✅ Fixed string error
      required: true,
    },
    brand: {
      type: String,
    },
    sizes: {
      type: [String],
    },
    colors: {
      type: [String],
      required: true,
    },
    collections: {
      type: String,
      required: true,
    },
    material: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeyword: {
      type: String,
    },
    dimensions: {
      height: Number,
      length: Number,
      width: Number,
    },
    weight: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
 