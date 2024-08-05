const router = require('express').Router();
const { Product, Customer, Order, OrderItem } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const productData = await Product.findAll({
      include: [
        // {
        //   model: Customer,
        //   // attributes: ['name'],
        // },
      ],
    });

    // Serialize data so the template can read it
    const products = productData.map((product) => product.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      products, 
      logged_in: req.session.logged_in, 
      customer_id: req.session.customer_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/product/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Customer,
          attributes: ['name'],
        },
      ],
    });

    const product = productData.get({ plain: true });

    res.render('product', {
      ...product,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/cart', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const customerData = await Customer.findByPk(req.session.customer_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const customer = CustomerData.get({ plain: true });

    res.render('cart', {
      ...customer,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log("hello");
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
