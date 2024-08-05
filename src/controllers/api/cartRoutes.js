const CartModel = require("../models/cartModel");
const OrderModel = require("../models/orderModel");

// Create a new cart
exports.createCart = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Customer not authenticated" });
    }

    console.log("Customer in session when creating cart:", req.customer);

    const customer = req.customer;
    const customerId = customer ? customer.customer_id : null;
    await CartModel.createCart(customerId);
   
    res.status(200).json({ message: "Cart created successfully" });
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add product to cart
exports.addProductToCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.body.product_id;
    const quantity = req.body.quantity || 1;
    const addedProduct = await CartModel.addProductToCart(cartId, productId, quantity);
    res.status(201).json(addedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get cart details
exports.getCartDetails = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartDetails = await CartModel.getCartDetails(cartId);
    res.render("cart", { cart: cartDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update product quantity in cart
exports.updateProductQuantityInCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.body.product_id;
    const quantity = req.body.quantity;

    const updatedProduct = await CartModel.updateProductQuantityInCart(cartId, productId, quantity);
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Remove product from cart
exports.removeProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.body.product_id;
    const removedProduct = await CartModel.removeProductFromCart(cartId, productId);
    res.json(removedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Checkout logic
exports.checkout = async (req, res) => {
  try {
    const cartId = req.params.cartId;

    const cartDetails = await CartModel.getCartDetails(cartId);
    if (!cartDetails || cartDetails.length === 0) {
      return res.status(404).json({ error: "Cart not found or is empty" });
    }

    const paymentStatus = "success";

    if (paymentStatus === "success") {
      const order = await OrderModel.createOrder(cartDetails);

      await CartModel.clearCart(cartId);

      return res.status(200).json({ message: "Checkout successful", order });
    } else {
      return res.status(400).json({ error: "Payment processing failed" });
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    return res.status(500).json({
      error: "Internal Server Error during checkout",
      details: error.message,
    });
  }
};
