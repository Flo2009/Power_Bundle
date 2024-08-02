document.getElementById('createPaymentForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const orderId = document.getElementById('paymentOrderId').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const amount = document.getElementById('paymentAmount').value.trim();
    const status = document.getElementById('paymentStatus').value;

    const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId, paymentMethod, amount, status })
    });
    const data = await response.json();
    console.log('Payment Created:', data);
});

