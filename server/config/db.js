const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/synergymobiles');
        const msg = 'MongoDB connected successfully';
        console.log(msg);
        try { fs.appendFileSync(path.join(__dirname, '../debug.log'), `[${new Date().toISOString()}] ${msg}\n`); } catch(e){}
    } catch (error) {
        const msg = `Error: ${error.message}`;
        console.error(msg);
        try { fs.appendFileSync(path.join(__dirname, '../debug.log'), `[${new Date().toISOString()}] ${msg}\n`); } catch(e){}
        // process.exit(1); // Do not exit process, just log error so server can stay alive for diagnostics
    }
};

module.exports = connectDB;
