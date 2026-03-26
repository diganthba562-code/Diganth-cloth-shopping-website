document.addEventListener('DOMContentLoaded', () => {
    const messageList = document.getElementById('message-list');
    const refreshBtn = document.getElementById('refresh-btn');
    const refreshLink = document.getElementById('refresh-link');

    const fetchMessages = async () => {
        try {
            messageList.innerHTML = '<p>Loading messages...</p>';
            const response = await fetch('http://localhost:5000/api/messages');
            if (!response.ok) throw new Error('Failed to fetch messages');
            const messages = await response.json();

            if (messages.length === 0) {
                messageList.innerHTML = '<p>No messages yet.</p>';
            } else {
                messageList.innerHTML = '';
                messages.forEach(msg => {
                    const item = document.createElement('div');
                    item.className = 'message-item glass';
                    item.innerHTML = `
                        <h3>${msg.name}</h3>
                        <p><strong>Email:</strong> ${msg.email}</p>
                        <p><strong>Sent on:</strong> ${new Date(msg.created_at).toLocaleString()}</p>
                        <blockquote>${msg.message}</blockquote>
                    `;
                    messageList.appendChild(item);
                });
            }
        } catch (error) {
            console.error('Error loading messages:', error);
            messageList.innerHTML = '<p style="color: #ff4d4d;">Failed to load messages. Make sure the backend is running.</p>';
        }
    };

    refreshBtn.addEventListener('click', fetchMessages);
    refreshLink.addEventListener('click', (e) => {
        e.preventDefault();
        fetchMessages();
    });

    fetchMessages();
});
