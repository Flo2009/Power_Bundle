const express = require('express');
const router = express.Router();

// Example order data
const order = {
    products: [
        { name: 'Energy Drink', price: 5.99 },
        { name: 'Healthy Snack', price: 3.49 },
        { name: 'Mix Bundle', price: 12.99 }
    ],
    total_amount: 22.47
};

router.get('/ordersummary', (req, res) => {
    res.render('ordersummary', { order });
});

module.exports = router;
