const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
    res.send('Diganth Cloth Brand API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
