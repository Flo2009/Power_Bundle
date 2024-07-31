const router = require('express').Router();
const { Product} = require('../../models');
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

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projductData = await Product.destroy({
      where: {
        id: req.params.id,
        customer_id: req.session.customer_id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
