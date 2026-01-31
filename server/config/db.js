const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        
        if (!mongoURI) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        // Mask URI for logging
        const maskedURI = mongoURI.replace(/:([^@]+)@/, ':****@');
        const logMsg = `Attempting to connect to MongoDB at: ${maskedURI}`;
        console.log(logMsg);
        try { fs.appendFileSync(path.join(__dirname, '../debug.log'), `[${new Date().toISOString()}] ${logMsg}\n`); } catch(e){}

        const conn = await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000, // Fail after 5 seconds if server not found
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });

        const successMsg = `MongoDB connected successfully: ${conn.connection.host}`;
        console.log(successMsg);
        try { fs.appendFileSync(path.join(__dirname, '../debug.log'), `[${new Date().toISOString()}] ${successMsg}\n`); } catch(e){}
    } catch (error) {
        const errorMsg = `MongoDB Connection Error: ${error.message}`;
        console.error(errorMsg);
        try { fs.appendFileSync(path.join(__dirname, '../debug.log'), `[${new Date().toISOString()}] ${errorMsg}\n`); } catch(e){}
        // process.exit(1); // Keep server alive to serve logs
    }
};

module.exports = connectDB;
