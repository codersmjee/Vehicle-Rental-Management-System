const app = require('./src/app');
const config = require('./src/config/config');
const { connectDB } = require('./src/db');

const startServer = async () => {
    try {
        // Connect to Database
        await connectDB();

        // Start Express Server
        app.listen(config.port, () => {
            console.log(`Server is running in ${config.env} mode on port ${config.port}`);
            console.log(`Documentation: http://localhost:${config.port}/api-docs`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
