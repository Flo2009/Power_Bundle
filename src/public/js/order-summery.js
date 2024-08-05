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
});
