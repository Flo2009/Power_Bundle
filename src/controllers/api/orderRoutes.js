const router = require('express').Router();
const { placeOrder } = require('../api/orderController');
const withAuth = require('../../utils/auth');

const getCustomerIdFromSession = (req, res, next) => {
  req.customerId = req.session.customerId;
  next();
};

router.post('/orders/checkout', getCustomerIdFromSession, async (req, res) => {
  const { customerId } = req;

  if (!customerId) return res.status(401).json({ message: 'Customer not logged in' });

  try {
    const order = await placeOrder(customerId);
    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});

module.exports = router;
