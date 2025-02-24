const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const donationsRoutes = require('./routes/donations');

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.json());
app.use('/api/donations', donationsRoutes);

mongoose.connect('mongodb://localhost:27017/feedforward', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`)))
    .catch((err) => console.error('MongoDB connection error:', err));