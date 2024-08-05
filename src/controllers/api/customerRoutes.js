const router = require('express').Router();
const { Customer } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const customerData = await Customer.create(req.body);

    req.session.save(() => {
      req.session.customer_id = customerData.id;
      req.session.logged_in = true;

      res.status(200).json(customerData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const customerData = await Customer.findOne({ where: { email: req.body.email } });
    console.log(customerData);
    if (!customerData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log('her I am');
    const validPassword = await customerData.checkPassword(req.body.password);
    console.log(validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log("here");
    req.session.save(() => {
      req.session.customer_id = customerData.id;
      req.session.logged_in = true;
      
      res.json({ Customer: customerData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;
