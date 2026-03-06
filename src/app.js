const express = require('express');
const cors = require('cors');
const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Vehicle Rental Management System API' });
});

// 404 handler
app.use((req, res, next) => {
    res.status(404);
    const error = new Error(`Route not found - ${req.originalUrl}`);
    next(error);
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
