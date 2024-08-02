const router = require('express').Router();

const customerRoutes = require('./customerRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const orderItemRoutes = require('/orderItemRoutes');

router.use('/customers', customerRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/orderitems', orderItemRoutes);

module.exports = router;