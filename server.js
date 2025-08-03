// server.js

const http = require('http');                     // Import the built-in http module – used to create a basic HTTP server
const app = require('./app');                     // Import the Express application setup
const mongoose = require('./db');                 // Import the database connection (MongoDB)
const PORT = process.env.PORT || 3000;            // Define the port the server will listen on – from env or default to 3000

// Create the HTTP server using the Express app
const server = http.createServer(app);

// Start listening on the specified port
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server started on port ${PORT}`);
    console.log(`📱 Open your browser: http://localhost:${PORT}`);
});

// Handle successful MongoDB connection
mongoose.connection.once('open', () => {
    console.log('✅ Connected to MongoDB');
});

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('💡 The app will continue running without database connection');
});

// Gracefully shut down the server on Ctrl+C
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});
