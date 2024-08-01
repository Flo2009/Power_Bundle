const router = require('express').Router();
const customerRoutes = require('./customerRoutes');
const productRoutes = require('./productRoutes');

router.use('/customers', userRoutes);
router.use('/products', productRoutes);

module.exports = router;

