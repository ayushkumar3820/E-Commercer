// seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Product from "./Models/Product.js";
import User from "./Models/UserModels.js";
import Cart from "./Models/Cart.js";

// Get current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars
try {
    dotenv.config({ path: join(__dirname, '.env') });
} catch (error) {
    console.error('Error loading .env file:', error);
    process.exit(1);
}

// Validate environment variables
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
    console.error("MONGODB_URL is not defined in .env file");
    process.exit(1);
}

// Connect to MongoDB with more detailed error handling
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

// Sample Product Data
const products = [
    {
        name: "Sample Product",
        price: 100,
        description: "This is a sample product",
        category: "Electronics",
        brand: "XYZ",
        countInStock: 10,
        rating: 4.5,
        numReviews: 10,
    },
];

const seedData = async () => {
    try {
        await connectDB();
        
        console.log("Starting data seeding...");

        // Clear existing data
        console.log("Clearing existing data...");
        await Product.deleteMany({});
        await User.deleteMany({});
        await Cart.deleteMany({});

        // Create admin user
        console.log("Creating admin user...");
        const createUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin",
        });

        const userId = createUser._id;

        // Add user reference to products
        console.log("Creating products...");
        const sampleProducts = products.map((product) => ({
            ...product,
            user: userId
        }));

        // Insert products
        await Product.insertMany(sampleProducts);
        
        console.log("Data seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error during seeding:");
        console.error(error);
        process.exit(1);
    }
};

// Run Seeder Function
seedData();