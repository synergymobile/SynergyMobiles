const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');

// Try to load .env from the server folder if not already loaded
dotenv.config({ path: path.join(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verify config
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.error('CLOUDINARY_CLOUD_NAME is not defined in environment variables');
}

module.exports = cloudinary;
