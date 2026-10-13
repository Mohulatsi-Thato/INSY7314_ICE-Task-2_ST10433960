require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.disable('x-powered-by');

app.use(helmet());

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => {
  res.status(200).json({
    app: process.env.APP_NAME || 'SecureAPI',
    message: 'API is running securely'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK'
  });
});

app.use('/api/books', bookRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});
