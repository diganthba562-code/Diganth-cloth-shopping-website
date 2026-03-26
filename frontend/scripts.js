document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const messageForm = document.getElementById('message-form');
    const formStatus = document.getElementById('form-status');

    // Backend API Base URL - Empty for relative paths on Vercel
    const API_BASE_URL = ''; 

    // Fetch products from backend
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const products = await response.json();
            
            if (products.length > 0) {
                renderProducts(products);
            } else {
                renderFallback();
            }
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
            `;
            productGrid.appendChild(card);
        });
    };

    const renderFallback = () => {
        const fallbacks = [
            { name: 'Premium Silk Shirt', price: '89.99', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop' },
            { name: 'Modern Denim Jacket', price: '129.50', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop' },
            { name: 'Designer Wool Coat', price: '199.00', image: 'https://images.unsplash.com/photo-1539109132332-629ee439a7df?q=80&w=1000&auto=format&fit=crop' }
        ];
        productGrid.innerHTML = '';
        fallbacks.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card glass';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <span>₹${product.price}</span>
            `;
            productGrid.appendChild(card);
        });
    };

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

    fetchProducts();
});
