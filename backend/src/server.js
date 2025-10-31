const app = require('./app');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to MongoDB
connectDB();

// Start server
const server = app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║                                        ║
  ║   🎉 ToriLynq API Server Started!     ║
  ║                                        ║
  ║   Environment: ${NODE_ENV.padEnd(24)}║
  ║   Port:        ${PORT.toString().padEnd(24)}║
  ║   URL:         http://localhost:${PORT.toString().padEnd(6)}║
  ║                                        ║
  ║   Health Check: /api/health            ║
  ║                                        ║
  ╚════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});
