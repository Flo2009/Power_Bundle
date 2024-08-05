document.addEventListener('DOMContentLoaded', function () {
    // Fetch order data from a global variable or API
    const order = window.orderData || {
        products: [
            { name: 'Energy Drink', price: 5.99 },
            { name: 'Healthy Snack', price: 3.49 },
            { name: 'Mix Bundle', price: 12.99 }
        ],
        total_amount: 22.47
    };

    // Function to render order summary
    function renderOrderSummary(order) {
        const orderList = document.getElementById('order-summary-list');
        
        // Clear existing items
        orderList.innerHTML = '';

        // Render each product
        order.products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                ${product.name}
                <span>$${product.price.toFixed(2)}</span>
            `;
            orderList.appendChild(listItem);
        });

        // Render total amount
        const totalItem = document.createElement('li');
        totalItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        totalItem.innerHTML = `
            <strong>Total</strong>
            <strong>$${order.total_amount.toFixed(2)}</strong>
        `;
        orderList.appendChild(totalItem);
    }

    // Render the order summary when the page loads
    renderOrderSummary(order);

    // Show modal on form submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', function (event) {
        // Prevent default form submission
        event.preventDefault();

        // Custom validation for credit card number
        const cardNumber = document.getElementById('cardNumber').value;
        const cardNumberPattern = /^\d{1,16}$/;
        if (!cardNumberPattern.test(cardNumber)) {
            alert('Credit card number must be between 1 and 16 digits.');
            return;
        }

        // Custom validation for card name
        const cardName = document.getElementById('cardName').value;
        const cardNamePattern = /^[A-Za-z\s]+$/;
        if (!cardNamePattern.test(cardName)) {
            alert('Name on card must not be numeric.');
            return;
        }

        // Custom validation for CVV number
        const cvv = document.getElementById('cvv').value;
        const cvvPattern = /^\d{1,3}$/;
        if (!cvvPattern.test(cvv)) {
            alert('CVV must be between 1 and 3 digits.');
            return;
        }

        // Show the thank you modal if validation passes
        $('#thankYouModal').modal('show');
    });
});
