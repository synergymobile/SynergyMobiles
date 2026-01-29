const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();

connectDB();

const app = express();


// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

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
// Also mount at root as a fallback for certain hosting environments
app.use('/', apiRouter);

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Serve static frontend in production
// Since frontend files are in public_html and server is in public_html/server
const distPath = path.join(__dirname, '..');
app.use(express.static(distPath));

// Wildcard route to serve index.html for SPA
app.get(/.*/, (req, res) => {
    // If request is not for /api, serve the frontend
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(distPath, 'index.html'));
    } else {
        res.status(404).json({ message: 'API Route Not Found' });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
