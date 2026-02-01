const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const cloudinary = require('../config/cloudinary');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for Local Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpg|jpeg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Images only!'));
        }
    },
});

router.post('/', protect, admin, upload.array('images', 3), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }

        // Generate full URLs for uploaded files
        const imageUrls = req.files.map(file => {
            // Construct absolute URL: protocol://host/uploads/filename
            // Note: On production behind proxy, req.protocol might need 'trust proxy' config
            return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
        });

        res.json(imageUrls);
    } catch (error) {
        console.error('Local Upload Error:', error);
        res.status(500).json({ message: 'Failed to upload images' });
    }
});

module.exports = router;
