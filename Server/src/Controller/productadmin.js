import Order from "../Models/Order.js";
import Product from "../Models/Product.js";

const productAdminRoute = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const OrderAdminRouter = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const orderAdminPut = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
      order.delivered = req.body.status === "Delivered" ? Date.now() : order.delivered;
      const updatedOrder = await order.save();
      res.status(200).json({ message: "Order updated successfully", updatedOrder });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const orderAdminDelete = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await Order.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Order deleted successfully", order });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { productAdminRoute, OrderAdminRouter, orderAdminPut, orderAdminDelete };
