const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        const createdUser = await User.create({
            name: 'Admin User',
            email: 'admin@synergy.com',
            password: 'password123',
            isAdmin: true,
        });

        const sampleProducts = [
            {
                name: 'iPhone 15 Pro Max',
                slug: 'iphone-15-pro-max',
                description: 'The ultimate iPhone.',
                price: 450000,
                brand: 'Apple',
                category: 'Mobiles',
                images: ['/uploads/sample-iphone.jpg'],
                features: ['A17 Pro chip', 'Titanium design'],
                isFeatured: true,
                isBestSeller: true,
                stock: 10
            },
            {
                name: 'Samsung Galaxy S24 Ultra',
                slug: 'samsung-galaxy-s24-ultra',
                description: 'Galaxy AI is here.',
                price: 400000,
                brand: 'Samsung',
                category: 'Mobiles',
                images: ['/uploads/sample-samsung.jpg'],
                features: ['Snapdragon 8 Gen 3', '200MP Camera'],
                isFeatured: true,
                stock: 15
            }
        ];

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
