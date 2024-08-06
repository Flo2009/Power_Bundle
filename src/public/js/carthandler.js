// const { JSDOM } = require( "jsdom" );
// const { window } = new JSDOM( "" );
// const $ = require( "jquery" ) (window);


let cart = [];
// console.log(req.session.customer_id);
// {
//   // customerId:,
// };

        async function addToCart(productId) {
          console.log(productId);
            const response = await fetch('/api/products/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId })
            });

            if (response.ok) {
                const result = await response.json();
                
                if (result.success) {
                    const product = result.product;
                    // product.dataValues['quantity'] = 1;
                    console.log(product);
                    // cart.push(product);
                    console.log(cart);
                    let check = false;
                    if (cart.length === 0){
                        product.total=product.quantity * product.price;
                        cart.push(product);
                        console.log(cart);
                    }else{
                        for (let i = 0; i < cart.length; i++){
                            if (cart[i].id === product.id){
                                cart[i].quantity++;
                                cart[i].total=cart[i].quantity * cart[i].price;
                                check=true;
                                break;
                            }
                        }
                        if (check===false){
                            product.total=product.quantity * product.price;
                            cart.push(product);
                            console.log(cart);
                            }else{
                                check=false;
                            }
                    }
                    
                    displayCart();
                    openModal(); // Show the modal
                
                } else {
                    alert('Product not found');
                }
            } else {
                alert('Error adding product to cart');
            }
        }
//render the cart modal
        function displayCart() {
            const cartDiv = document.getElementById('cart');
            cartDiv.innerHTML = '';

            cart.forEach((product, index )=> {
                const productDiv = document.createElement('div');
                productDiv.className = 'cart-item mb-3';
                productDiv.innerHTML = `
                    <h5>${product.name}</h5>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <button class="btn btn-secondary btn-sm" onclick="updateQuantity(${index}, -1)">-</button>
                    <p>Quantity: ${product.quantity}</p>
                    <button class="btn btn-secondary btn-sm" onclick="updateQuantity(${index}, 1)">+</button>
                    <p>Total: $${product.total}</p>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index}, ${product.customerId}, ${product.id})">Remove</button>
                    `;
                cartDiv.appendChild(productDiv);
            });
        }

      
      function openModal() {
        const modal = new bootstrap.Modal(document.getElementById('cartModal'));
        modal.show();
    }

    function closeModal() {
        const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        modal.hide();

    }

    // Function to remove items from the cart
function removeFromCart(index, customerId, productId) {
    const cartDelete={
        customerId: customerId,
        productId: productId,
    }
    console.log(cartDelete);
    cart.splice(index, 1);
    displayCart();
    removeItemFromCart(cartDelete);
    
  }

  // Function to update item quantity in the cart
function updateQuantity(index, change) {
    cart[index].quantity += change;
    const quantity = cart[index].quantity;
    const productId = cart[index].id;
    const customerId = cart[index].customerId;
    
    if (cart[index].quantity <= 0) {
        removeFromCart(index, customerId, productId);
    } else {
      cart[index].total = cart[index].quantity * cart[index].price
      
      const cartInfo={
        customerId: customerId,
        productId: productId,
        quantity: quantity,
        }; 
      displayCart();
      updateCartBackend(cartInfo);
    }
  }

  // Function to update the cart on the backend
async function updateCartBackend(cartInfo) {
    
    console.log(cartInfo);
    const response = await fetch('/api/products/cart/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartInfo)
    });
  
    if (!response.ok) {
      const error = await response.json();
      console.error('Error updating cart:', error);
    }
  }
  
  const removeItemFromCart = async (cartDelete) => {
    console.log(cartDelete);
    const response = await fetch('/api/products/cart/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartDelete)
    });

    if (response.ok) {
        const result = await response.json();
    } else {
      console.error('Failed to remove cart item');
    }
  };

  async function getId(productId) {
    console.log(productId);
      const response = await fetch('/api/products/cart', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId })
      });

      if (response.ok) {
          const result = await response.json();
          
          if (result.success) {
              const product = result.product;
              // let idGet =[]
              console.log(product);
              
              console.log(product.customerId);
              let customerId = product.customerId
              const response = await fetch('/ordersummary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ customerId })
            });
      
            if (response.ok) {
                const result = await response.json();};

          }else {
            alert('Product not found');
        }
      }  
    };

    document.addEventListener('DOMContentLoaded', () => {
      // Existing add-to-cart functionality...
    
      const checkoutButton = document.getElementById('checkout');
    
      checkoutButton.addEventListener('click', () => {
        // getId(1);
        // console.log(getId.customerId);
        window.location.href = '/ordersummary';
      });
    });
  // Initial rendering of the cart
displayCart();