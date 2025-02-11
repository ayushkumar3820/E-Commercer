import Cart from "../Models/Cart.js";
import Checkout from "../Models/Checkout.js";
import Order from "../Models/Order.js";

// 📌 Create a new Checkout Order
const checkoutPost = async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(404).json({ message: "No items in checkout" });
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user.id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
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
            checkout.paymentDetails = {
                transactionId: paymentDetails.transactionId,
                paymentGateway: paymentDetails.paymentGateway,
                amount: paymentDetails.amount,
                currency: paymentDetails.currency
            };
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

        // Transform checkout items to match Order schema
        const orderItems = checkout.checkoutItems.map(item => ({
            productId: item.productId,
            name: item.name,
            images: item.images[0], // Take first image since Order schema expects single string
            price: item.price,
            quantity: 1, // Set default quantity or get from request
            size: req.body.size || "", // Optional
            color: req.body.color || "" // Optional
        }));

        // Create Order
        const finalOrder = await Order.create({
            user: checkout.user,
            OrderItems: orderItems,
            shippingAddress: checkout.shippingAddress,
            paymentMethod: checkout.paymentMethod,
            totalPrice: checkout.totalPrice,
            isPaid: checkout.isPaid,
            paidAt: checkout.paidAt,
            isDelivered: false,
            paymentStatus: checkout.paymentStatus,
            paymentDetails: checkout.paymentDetails,
        });

        // Mark Checkout as Finalized
        checkout.isFinalized = true;
        checkout.finalizedAt = Date.now();
        await checkout.save();

        // Remove User's Cart
        await Cart.findOneAndDelete({ user: checkout.user });

        res.status(201).json(finalOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
export { checkoutPost, checkoutPut, checkoutPostById };