const loginButtons = document.querySelectorAll('.login');
const signInButtons = document.querySelectorAll('.signup');

  loginButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      console.log("Login Route")
  // Collect values from the login form
  
      const email = document.querySelector('#email-login').value.trim();
      const password = document.querySelector('#password-login').value.trim();
      if (email && password){
      const response = await fetch(`/api/customers/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    };
    });
    });

  signInButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      console.log("signin");
      const name = document.querySelector('#name-signup').value.trim();
      const email = document.querySelector('#email-signup').value.trim();
      const password = document.querySelector('#password-signup').value.trim();
      const address = document.getElementById('#customer-address').value.trim;

  if (name && email && password && address) {
    const response = await fetch('/api/customers', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, address }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log("Success");
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
    }
    });
  });