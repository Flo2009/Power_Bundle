const router = require('express').Router();
const { Order} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newOrder = await Order.create({
      ...req.body,
      customer_id: req.session.customer_id,
    });

    res.status(200).json(newOrder);
  } catch (err) {
    res.status(400).json(err);
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
      res.status(404).json({ message: 'No product is  found!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
