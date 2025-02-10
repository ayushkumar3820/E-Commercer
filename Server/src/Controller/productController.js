import { query } from "express";
import Product from "../Models/Product.js";

const productPost = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      images,
      gender,
      dimensions,
      isPublished,
      isFeatured,
      tags,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      images,
      gender,
      dimensions,
      isPublished,
      isFeatured,
      tags,
      user: req.user._id,
    });
    console.log("................", product);
    const createProduct = await product.save();
    console.log("..........", createProduct);
    res
      .status(201)
      .json({ message: "Product created successfully", createProduct });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Product data is invalid", error: err.message });
  }
};

const productUpdate = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      images,
      gender,
      dimensions,
      isPublished,
      isFeatured,
      tags,
      weight,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;

      product.sku = sku || product.sku;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.images = images || product.images;
      product.gender = gender || product.gender;
      product.dimensions = dimensions || product.dimensions;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.tags = tags || product.tags;
      product.weight = weight || product.weight;

      const updateProduct = await product.save();
      res.json(updateProduct);
    } else {
      res.status(404).json({ message: "Product No Found " });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Product data is invalid", error: err.message });
  }
};

const productDelete = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.status(200).json({ message: "Product Removed " });
    } else {
      res.status(401).json({ message: "product not  found" });
    }
  } catch (err) {
    res.status(401).json({ message: "Server Error" });
  }
};

const productGet = async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit = 0,
    } = req.body;

    // Build query object
    const query = {};

    // Add filters only if they exist and are not "all"
    if (collection?.toLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category?.toLowerCase() !== "all") {
      query.category = category;
    }

    // Handle array filters
    const arrayFilters = {
      material,
      brand,
      size,
      color,
      gender,
    };

    // Add array filters to query
    Object.entries(arrayFilters).forEach(([key, value]) => {
      if (value) {
        query[key] = { $in: value.split(" ") };
      }
    });

    // Handle price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Handle search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Define sort options
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDes":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          // Default sort (you can modify this as needed)
          sort = { createdAt: -1 };
      }
    }

    // Execute query with all filters
    const products = await Product.find(query).sort(sort).limit(Number(limit));

    // Return response
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Product filtering error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

const productGetId = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(400).json({ message: "Product Not Found " });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("server Error");
  }
};

const productSimilarGet = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not Found " });
    }

    const similarProduct = await Product.find({
      _id: { $in: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.status(200).json(similarProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send("server Error");
  }
};

const productBestSeller = async (req, res) => {
  try {
    const bestseller = await Product.findOne().sort({ rating: -1 });
    if (bestseller) {
      res.status(201).json(bestseller);
    } else {
      return res.status(404).json({ message: "No Best seller  Found  " });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("server Error");
  }
};

const productArrival = async (req, res) => {
  try {
    const productArrivals = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8);
    res.json(productArrivals);
  } catch (error) {
    console.error(err);
    res.status(500).send("server Error");
  }
};

export {
  productPost,
  productUpdate,
  productDelete,
  productGet,
  productGetId,
  productSimilarGet,
  productBestSeller,
  productArrival
};
