document.addEventListener('DOMContentLoaded', () => {
    const placeOrderButton = document.getElementById('placeOrder');
  
    placeOrderButton.addEventListener('click', async () => {
      const response = await fetch('/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        window.location.href = '/';
      } else {
        const error = await response.json();
        alert(error.message);
      }
    });
  });

  