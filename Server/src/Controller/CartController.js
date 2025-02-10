import Cart from "../Models/Cart.js";
import Product from "../Models/Product.js";

const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

const cart = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    // Validate product existence first
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Input validation
    if (quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId && 
              p.size === size && 
              p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0]?.url || "",
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
      await cart.save();
    } else {
      // Create new cart with a more reliable guest ID
      const guestCartId = guestId || `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      cart = await Cart.create({
        user: userId || undefined,
        guestId: guestCartId,
        products: [{
          productId,
          name: product.name,
          image: product.images[0]?.url || "",
          price: product.price,
          size,
          color,
          quantity,
        }],
        totalPrice: product.price * quantity,
      });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Cart operation error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const cartProduct = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    // Input validation
    if (!productId || size === undefined || color === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && 
            p.size === size && 
            p.color === color
    );

    if (productIndex === -1) {
      // If product not found, fetch it from database and add it
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      cart.products.push({
        productId,
        name: product.name,
        image: product.images[0]?.url || "",
        price: product.price,
        size,
        color,
        quantity: quantity || 1,
      });
    } else {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
      }
    }

    cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const cartDeleted = async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    // Input validation
    if (!productId || size === undefined || color === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && 
            p.size === size && 
            p.color === color
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.products.splice(productIndex, 1);
    cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error deleting from cart:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const cartGet = async (req, res) => {
  const userId = req.query?.userId || null;
  const guestId = req.query?.guestId || null;

  try {
    console.log("Checking Cart for:", { userId, guestId }); // Debugging

    const cart = await getCart(userId, guestId);

    if (cart) {
      console.log("Cart Found:", cart); // Debugging
      return res.json(cart);
    } else {
      console.log("Cart Not Found in Database"); // Debugging
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error retrieving cart:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



const cartMerger = async (req, res) => {
  const { guestId } = req.body;
  
  try {
    // Input validation
    if (!guestId) {
      return res.status(400).json({ message: "Guest ID is required" });
    }
    
    if (!req.user?._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    // If no guest cart exists
    if (!guestCart) {
      // If user has their own cart, return it
      if (userCart) {
        return res.status(200).json(userCart);
      }
      return res.status(404).json({ message: "Guest cart not found" });
    }

    // If guest cart exists but is empty
    if (guestCart.products.length === 0) {
      try {
        await Cart.findOneAndDelete({ guestId });
        if (userCart) {
          return res.status(200).json(userCart);
        }
        return res.status(400).json({ message: "Guest cart is empty" });
      } catch (error) {
        console.error("Error deleting empty guest cart:", error);
      }
    }

    // If user has an existing cart, merge the products
    if (userCart) {
      guestCart.products.forEach((guestItem) => {
        const productIndex = userCart.products.findIndex(
          (item) =>
            item.productId.toString() === guestItem.productId.toString() &&
            item.size === guestItem.size &&
            item.color === guestItem.color
        );

        if (productIndex > -1) {
          userCart.products[productIndex].quantity += guestItem.quantity;
        } else {
          userCart.products.push({
            ...guestItem.toObject(),
            _id: undefined // Remove the old _id to prevent conflicts
          });
        }
      });

      userCart.totalPrice = userCart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await userCart.save();

      // Delete guest cart after successful merge
      try {
        await Cart.findOneAndDelete({ guestId });
      } catch (error) {
        console.error("Error deleting guest cart after merge:", error);
        // Continue execution as this is not a critical error
      }

      return res.status(200).json(userCart);
    }

    // If user doesn't have a cart, convert guest cart to user cart
    guestCart.user = req.user._id;
    guestCart.guestId = undefined;
    await guestCart.save();
    
    return res.status(200).json(guestCart);
    
  } catch (error) {
    console.error("Error merging carts:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};




export { cart, cartProduct, cartDeleted,cartGet,cartMerger};