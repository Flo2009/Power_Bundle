const router = require('express').Router();
const { Product, Customer, Cart, CartItem, Order, OrderItem } = require('../models');
const { getCartItems } = require('./api/cartController');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const productData = await Product.findAll({
      include: [
       
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

router.get('/ordersummary', withAuth, async (req, res) => {
  try {
    const  customerId  = req.session.customer_id;
    console.log(customerId);
    if (!customerId) return res.redirect('/login'); // Redirect to login if customer is not logged in

    const cartItemsData = await getCartItems(customerId);
    const cartItems = cartItemsData.cartItems.map(item => item.get({ plain: true }));

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    console.log(total);
    res.render('ordersummary', {
      // cartItems,
      // total: total.toFixed(2),
      // logged_in: req.session.logged_in,
      // customer_id: req.session.customer_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// // Use withAuth middleware to prevent access to route
// router.get('/cart', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const customerData = await Customer.findByPk(req.session.customer_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Product }],
//     });

//     const customer = CustomerData.get({ plain: true });

//     res.render('cart', {
//       ...customer,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log("hello");
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});



router.get('/cart', async (req, res) => {
  console.log("I am Here");
  try {
    const  customerId  = 3;
    const  cartId  = 2;
    const cart = await Cart.findAll({ 
      where: { customerId },
      include: {model: CartItem,
        include: {
          model: Product,
          attributes: ['id', 'name', 'price', 'description']
        }
       }
    });
    console.log(cart);
    // if (!cart) return { cartItems: [] };
    res.status(200).json(cart);
    // return { cartItems: cart.cartItems };
  } catch (error) {
    console.error('Failed to get cart items:', error);
    throw error;
  }
});

module.exports = router;
