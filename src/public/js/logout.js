const logoutButtons = document.querySelectorAll('#logout');





logoutButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log("Logout Route")
// Collect values from the login form
    const response = await fetch(`/api/customers/logout`, {
      method: 'POST',
      // body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out');
    }
  
  });
  });