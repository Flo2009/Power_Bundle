document.getElementById('createOrderItemForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('orderItemOrderId').value;
    const name = document.getElementById('orderItemProductId').value;
    const address = document.getElementById('orderItemQuantity').value;
    

    const response = await fetch('/api/orderitems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId, productId, quantity, price })
    });
    const data = await response.json();
    console.log('Order Item Created:', data);
});
 