const router = require('express').Router();
const { Product, Customer, Order, OrderItem } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const productData = await Product.findAll({
      include: [
        {
          model: Customer,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = productData.map((project) => Product.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      products, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
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

    res.render('project', {
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

    const user = CustomerData.get({ plain: true });

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
  if (req.session.logged_in) {
    res.redirect('/cart');
    return;
  }

  res.render('login');
});

module.exports = router;
