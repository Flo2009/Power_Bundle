const router = require('express').Router();
const { OrderItem, Cart, CartItem} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newOrderItem = await OrderItem.create({
      ...req.body,
      order_id: req.session.order_id,
    });

    res.status(200).json(newOrderItem);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projductData = await Product.destroy({
      where: {
        id: req.params.id,
        customer_id: req.session.customer_id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product is found!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/carts', async (req, res) => {
  const { cartTotal } = req.body;
  console.log(cartTotal);
  try {
    // for (let i = 0; i < cart.length; i++){
      const cart = await Cart.findOne({ where: { customerId } });
    
    

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Remove existing items
    await CartItem.destroy({ where: { cartId: cart.id } });

    // Add new items
    const cartItems = await Promise.all(items.map(async item => {
      const product = await Product.findByPk(item.productId);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      return CartItem.create({
        cartId: cart.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }));

    res.status(200).json({ cart, cartItems });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
