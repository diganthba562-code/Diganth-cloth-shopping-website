const db = require('../config/db');
const nodemailer = require('nodemailer');

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// In-memory fallback for demo purposes
let mockMessages = [
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'I love your new collection!', created_at: new Date() }
];

exports.saveMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
        
        try {
            await db.query('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
        } catch (dbErr) {
            console.warn('Database error, saving to mock storage...');
            mockMessages.unshift({ id: Date.now(), name, email, message, created_at: new Date() });
        }

        // Send Email using Nodemailer
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER, // Send email to yourself
                subject: `New Message from ${name}`,
                text: `You have received a new contact message.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`
            };
            await transporter.sendMail(mailOptions);
            console.log("Email notification sent successfully!");
        } catch (emailErr) {
            console.error("Error sending email notification:", emailErr);
        }

        res.status(201).json({ success: 'Message sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.warn('Database error, providing mock messages...');
        res.json(mockMessages);
    }
};
