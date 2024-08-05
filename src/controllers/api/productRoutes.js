const router = require('express').Router();
const { Product} = require('../../models');
const { addItemToCart } = require('../api/addItemToCart');
const withAuth = require('../../utils/auth');

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
//cart route to create and update the cart 
router.post('/cart', withAuth, async (req, res) => {
  // // if(!req.session.customerId){
  // //   return res.status(401).json({ message: 'Customer not logged in' });
  // }
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
