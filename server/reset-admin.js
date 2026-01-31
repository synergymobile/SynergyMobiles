const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User'); // Adjust path if needed

dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const resetAdmin = async () => {
    await connectDB();

    const email = 'admin@synergy.com';
    const password = 'admin123'; // Default temporary password
    const name = 'Super Admin';

    try {
        // Check if admin exists
        let user = await User.findOne({ email });

        if (user) {
            console.log('Admin user found. Updating password...');
            user.password = password; // Will be hashed by pre-save hook
            user.isAdmin = true;
            await user.save();
            console.log(`Admin updated! Email: ${email}, Password: ${password}`);
        } else {
            console.log('Admin user not found. Creating new admin...');
            user = await User.create({
                name,
                email,
                password,
                isAdmin: true
            });
            console.log(`Admin created! Email: ${email}, Password: ${password}`);
        }

        process.exit();
    } catch (error) {
        console.error('Error resetting admin:', error);
        process.exit(1);
    }
};

resetAdmin();
