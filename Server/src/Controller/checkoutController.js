import Cart from "../Models/Cart.js";
import Checkout from "../Models/Checkout.js";
import Order from "../Models/Order.js"; // Import the Order model

// 📌 Create a new Checkout Order
const checkoutPost = async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(404).json({ message: "No items in checkout" });
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user.id, // Fixed `res.user._id` to `req.user._id`
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending", // Fixed incorrect field name
        });

        console.log(`Checkout created for user: ${req.user.id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// 📌 Update Checkout Payment Status
const checkoutPut = async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();

            await checkout.save();
            return res.status(200).json(checkout);
        } else {
            return res.status(400).json({ message: "Invalid payment status" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// 📌 Finalize Checkout & Create Order
const checkoutPostById = async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.isFinalized) {
            return res.status(400).json({ message: "Checkout already finalized" });
        }

        // Create Order
        const finalOrder = await Order.create({
            user: checkout.user,
            orderItems: checkout.checkoutItems, // Fixed incorrect field name
            shippingAddress: checkout.shippingAddress,
            paymentMethod: checkout.paymentMethod,
            isPaid: checkout.isPaid,
            paidAt: checkout.paidAt,
            isDelivered: false,
            paymentStatus: "paid",
            paymentDetails: checkout.paymentDetails, // Fixed typo `paymentDeatlis`
        });

        // Mark Checkout as Finalized
        checkout.isFinalized = true;
        checkout.finalizedAt = Date.now();
        await checkout.save();

        // Remove User's Cart after successful checkout
        await Cart.findOneAndDelete({ user: checkout.user });

        res.status(201).json(finalOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { checkoutPost, checkoutPut, checkoutPostById };
