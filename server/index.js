const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

dotenv.config();

connectDB();

const app = express();

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use('/api', limiter);

app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const pageRoutes = require('./routes/pageRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
