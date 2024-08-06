const router = require('express').Router();
const { Product} = require('../../models');
const { addItemToCart, updateCartItem, removeCartItem } = require('../api/cartController');
const withAuth = require('../../utils/auth');
//get all products to display
router.post('/', withAuth, async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      customer_id: req.session.customer_id,
    });

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});
//cart route to create and update the cart front and backend
router.post('/cart', withAuth, async (req, res) => {
  
  try {
    const { productId } = req.body;
    const product = await Product.findByPk(productId);
    product.dataValues['customerId']=req.session.customer_id;
    product.dataValues['loggedIn']=req.session.logged_in;
    product.dataValues['quantity'] = 1;
    product.dataValues['total'] = 0;
    console.log(product);
    const customerId = product.dataValues.customerId;
    const quantity = product.dataValues.quantity;
    if (product){
      const cart = await addItemToCart(customerId, productId, quantity);
      res.json({ success: true, product });
      } else {
      res.status(404).json({ success: false, message: "Product not found"});
    }
  } catch {
    res.status(500).json(err);
  }
});
//update route for the cart
router.post('/cart/update', withAuth, async (req, res) => {
  const { customerId, productId, quantity } = req.body;
  // const  customerId  = req.session.customerId;

  if (!customerId) return res.status(401).json({ message: 'Customer not logged in' });

  try {
    const cart = await updateCartItem(customerId, productId, quantity);
    res.status(200).json({ message: 'Cart item updated', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart item', error: error.message });
  }
});
//remove route for the cart
router.post('/cart/remove', withAuth, async (req, res) => {
  const { customerId, productId } = req.body;
  // const { customerId } = req;

  if (!customerId) return res.status(401).json({ message: 'Customer not logged in' });

  try {
    const cart = await removeCartItem(customerId, productId);
    res.status(200).json({ message: 'Cart item removed', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove cart item', error: error.message });
  }
});

//potential to delete a product
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
        customer_id: req.session.customer_id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
