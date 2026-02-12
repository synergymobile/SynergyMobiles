const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const fs = require('fs');

// Create/Append to a debug log file
const logFile = path.join(__dirname, 'debug.log');
const log = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(message);
    try {
        fs.appendFileSync(logFile, logMessage);
    } catch (err) {
        console.error('Failed to write to log file:', err);
    }
};

dotenv.config({ path: path.join(__dirname, '.env') });

log('--- Server Startup Diagnostics ---');
log(`Current Working Directory: ${process.cwd()}`);
log(`Server Directory (__dirname): ${__dirname}`);
log(`Environment File Path: ${path.join(__dirname, '.env')}`);
log(`MONGO_URI loaded: ${process.env.MONGO_URI ? 'Yes' : 'No'}`);
log(`PORT: ${process.env.PORT}`);
log('----------------------------------');

connectDB();

const app = express();


// Middlewares
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));
app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Database health check
app.get('/health-db', (req, res) => {
    const state = mongoose.connection.readyState;
    const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    };
    res.status(200).json({ 
        status: states[state] || 'unknown',
        readyState: state,
        host: mongoose.connection.host 
    });
});

// Log all requests for debugging
app.use((req, res, next) => {
    log(`${req.method} ${req.path}${req.url.includes('?') ? '?' + req.url.split('?')[1] : ''}`);
    next();
});

// Main limited API routes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use('/api', limiter);

const apiRouter = express.Router();

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const pageRoutes = require('./routes/pageRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const orderRoutes = require('./routes/orderRoutes');

apiRouter.use('/products', productRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/pages', pageRoutes);
apiRouter.use('/inquiries', inquiryRoutes);
apiRouter.use('/upload', uploadRoutes);
apiRouter.use('/orders', orderRoutes);

// Mount the API router
app.use('/api', apiRouter);

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Serve static frontend in production
// const distPath = path.join(__dirname, '../client/dist');
// Changed to local dist folder to avoid path traversal issues in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Route to view debug logs in browser
app.get('/debug-logs', (req, res) => {
    const logPath = path.join(__dirname, 'debug.log');
    if (fs.existsSync(logPath)) {
        res.setHeader('Content-Type', 'text/plain');
        res.sendFile(logPath);
    } else {
        res.status(404).send('No log file found');
    }
});

// Wildcard route to serve index.html for SPA
app.get('*', (req, res) => {
    // If request is not for /api, serve the frontend
    if (!req.path.startsWith('/api')) {
        const indexPath = path.join(distPath, 'index.html');
        log(`SPA Routing: ${req.path} -> serving ${indexPath}`);
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            const msg = `Frontend build not found at ${indexPath}. Please build the client and ensure dist/index.html exists.`;
            log(msg);
            res.status(404).send(msg);
        }
    } else {
        log(`API 404: ${req.path}`);
        res.status(404).json({ message: 'API Route Not Found' });
    }
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
    log(`Server Error: ${err.message}`);
    if (err.code === 'EADDRINUSE') {
        log('Port is already in use. This might be a temporary deployment issue.');
    }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    log(`Unhandled Rejection: ${err.message}`);
    if (err.stack) log(err.stack);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    log(`Uncaught Exception: ${err.message}`);
    if (err.stack) log(err.stack);
    // On some environments, we might want to exit, but on Hostinger 
    // we try to stay alive if possible to show logs
    // process.exit(1); 
});
