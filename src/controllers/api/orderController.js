const { Order, OrderItem, Cart, CartItem, Product, sequelize } = require('../../models');

const placeOrder = async (customerId) => {
  const transaction = await sequelize.transaction();
  try {
    const cart = await Cart.findOne({ where: { customerId }, include: [CartItem] });
    if (!cart) throw new Error('Cart not found');

    const order = await Order.create({ customerId, status: 'Processing' }, { transaction });

    const orderItems = cart.cartItems.map(cartItem => ({
      orderId: order.id,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      price: cartItem.price,
    }));

    await OrderItem.bulkCreate(orderItems, { transaction });

    await CartItem.destroy({ where: { cartId: cart.id }, transaction });
    await Cart.destroy({ where: { id: cart.id }, transaction });

    await transaction.commit();
    return order;
  } catch (error) {
    await transaction.rollback();
    console.error('Failed to place order:', error);
    throw error;
  }
};

module.exports = { placeOrder };
