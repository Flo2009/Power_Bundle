const { Customer, Cart, CartItem, Product } = require('../../models');

const addItemToCart = async (customerId, productId, quantity) => {
  try {
    // Find the customer by ID
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Find the product by ID
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Check if the customer has an existing cart
    let cart = await Cart.findOne({ where: { customerId } });

    // If no cart exists, create a new one
    if (!cart) {
      cart = await Cart.create({ customerId });
    }

    // Check if the product is already in the cart
    let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });

    // If the product is already in the cart, update the quantity
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If the product is not in the cart, add it
      await CartItem.create({ cartId: cart.id, productId, quantity, price: product.price });
    }

    return cart;
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    throw error;
  }
};
//update the cart on the backend
const updateCartItem = async (customerId, productId, quantity) => {
  try {
    const cart = await Cart.findOne({ where: { customerId } });
    if (!cart) throw new Error('Cart not found');

    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (!cartItem) throw new Error('Cart item not found');

    cartItem.quantity = quantity;
    await cartItem.save();

    if (cartItem.quantity === 0) await cartItem.destroy();

    return cart;
  } catch (error) {
    console.error('Failed to update cart item:', error);
    throw error;
  }
};
//remove the item from the cart on the backend
const removeCartItem = async (customerId, productId) => {
  try {
    const cart = await Cart.findOne({ where: { customerId } });
    if (!cart) throw new Error('Cart not found');

    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (!cartItem) throw new Error('Cart item not found');

    await cartItem.destroy();

    return cart;
  } catch (error) {
    console.error('Failed to remove cart item:', error);
    throw error;
  }
};

const getCartItems = async (customerId) => {
  try {
    const cart = await Cart.findOne({ 
      where: { customerId },
      include: {
        model: CartItem,
        include: {
          model: Product,
          attributes: ['id', 'name', 'price', 'description']
        }
      }
    });

    if (!cart) return { cartItems: [] };

    return { cartItems: cart.cartItems };
  } catch (error) {
    console.error('Failed to get cart items:', error);
    throw error;
  }
};

module.exports = { getCartItems, addItemToCart, updateCartItem, removeCartItem };

