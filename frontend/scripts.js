document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const messageForm = document.getElementById('message-form');
    const formStatus = document.getElementById('form-status');
    const cartBtn = document.getElementById('cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutForm = document.getElementById('checkout-form');
    const cancelCheckout = document.getElementById('cancel-checkout');

    // Backend API Base URL - Empty for relative paths on Vercel
    const API_BASE_URL = ''; 

    // Cart State
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Fetch products from backend
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error loading products:', error);
            renderFallback();
        }
    };

    const renderProducts = (products) => {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card glass';
            card.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}">
                <h3>${product.name}</h3>
                <span>₹${product.price}</span>
                <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image_url}">
                    Add to Cart
                </button>
            `;
            productGrid.appendChild(card);
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = {
                    id: e.target.dataset.id,
                    name: e.target.dataset.name,
                    price: parseFloat(e.target.dataset.price),
                    image: e.target.dataset.image,
                    quantity: 1
                };
                addToCart(item);
            });
        });
    };

    const renderFallback = () => {
        const fallbacks = [
            { id: 1, name: 'Essential Oversized Hoodie', price: 1300.00, image: '/assets/premium_hoodie.png' },
            { id: 2, name: 'Premium Vintage Denim Jacket', price: 2400.00, image: '/assets/premium_denim_jacket.png' },
            { id: 3, name: 'Heavyweight Oversized Premium Tee', price: 45.00, image: '/assets/premium_oversized_tee.png' },
            { id: 5, name: 'Premium Retro Air Jordans', price: 180.00, image: '/assets/premium_jordans.png' }
        ];
        renderProducts(fallbacks.map(f => ({ ...f, image_url: f.image })));
    };

    // Cart Functions
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id == product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }
        saveCart();
        updateCartUI();
        toggleCart(true); // Open cart when item added
    };

    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id != productId);
        saveCart();
        updateCartUI();
    };

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const updateCartUI = () => {
        // Update count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update items list
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
            totalPriceElement.textContent = '₹0.00';
            return;
        }

        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} x ${item.quantity}</p>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });

        totalPriceElement.textContent = `₹${total.toFixed(2)}`;

        // Add remove listeners
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
        });
    };

    const toggleCart = (show) => {
        if (show) {
            cartDrawer.classList.add('active');
        } else {
            cartDrawer.classList.remove('active');
        }
    };

    // Event Listeners for Cart
    cartBtn.addEventListener('click', () => toggleCart(true));
    closeCart.addEventListener('click', () => toggleCart(false));

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return alert('Cart is empty!');
        toggleCart(false);
        checkoutModal.classList.add('active');
    });

    cancelCheckout.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });

    // Handle Checkout Submission
    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const customer_name = document.getElementById('cust-name').value;
        const customer_email = document.getElementById('cust-email').value;
        const total_amount = parseFloat(totalPriceElement.textContent.replace('₹', ''));

        const orderData = {
            customer_name,
            customer_email,
            items: cart,
            total_amount
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                alert('Success! Your order has been placed.');
                cart = [];
                saveCart();
                updateCartUI();
                checkoutModal.classList.remove('active');
                checkoutForm.reset();
            } else {
                const err = await response.json();
                alert('Order failed: ' + (err.error || 'Unknown error') + '\n\n' + (err.details || ''));
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to connect to server. Check your connection.');
        }
    });

    // Handle message form submission
    if (messageForm) {
        messageForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            try {
                const response = await fetch(`${API_BASE_URL}/api/messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message })
                });

                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.style.color = '#d4af37';
                    messageForm.reset();
                } else {
                    formStatus.textContent = 'Failed to send message. Please try again.';
                    formStatus.style.color = '#ff4d4d';
                }
            } catch (error) {
                console.error('Error sending message:', error);
                formStatus.textContent = 'Server error. Please try again later.';
                formStatus.style.color = '#ff4d4d';
            }
        });
    }

    // Initial Load
    fetchProducts();
    updateCartUI();
});
