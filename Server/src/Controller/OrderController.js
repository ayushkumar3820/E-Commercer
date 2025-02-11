import Order from "../Models/Order.js";

const myOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const orderGet = async (req, res) => {
  try {
    const getOrder = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!getOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(getOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { myOrder, orderGet };
