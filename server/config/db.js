const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/synergymobiles');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // process.exit(1); // Do not exit process, just log error so server can stay alive for diagnostics
    }
};

module.exports = connectDB;
