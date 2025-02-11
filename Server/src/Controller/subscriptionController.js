import Subscription from "../Models/subscriptionSchema.js";

const subscriptionController = async (req, res) => {
  const { email } = req.body; // Corrected from res.body to req.body

  if (!email) { // Corrected condition to check if email is missing
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    let subscriber = await Subscription.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ message: "Email is already subscribed" });
    }

    subscriber = new Subscription({ email }); // Corrected model name
    await subscriber.save();
    res.status(201).json({ message: "Successfully subscribed to the newsletter" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { subscriptionController };
