const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Use the same debug log as index.js
const logFile = path.join(__dirname, '../debug.log');
const log = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [UPLOAD] ${message}\n`;
    console.log(`[UPLOAD] ${message}`);
    try {
        fs.appendFileSync(logFile, logMessage);
    } catch (err) {}
};

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    log(`Creating uploads directory: ${uploadDir}`);
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Check write permissions
try {
    const testFile = path.join(uploadDir, '.test-write');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    log('Uploads directory is writable');
} catch (err) {
    log(`CRITICAL: Uploads directory is NOT writable: ${err.message}`);
}

// Configure Multer for Local Storage (Temporary)
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

router.post('/', protect, admin, upload.array('images', 50), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            log('No files in request');
            return res.status(400).json({ message: 'No images uploaded' });
        }

        log(`Processing ${req.files.length} files`);

        const uploadPromises = req.files.map(async (file) => {
            try {
                if (!fs.existsSync(file.path)) {
                    log(`File missing at path: ${file.path}`);
                    return null;
                }
                
                if (file.size === 0) {
                    log(`File is empty: ${file.originalname}`);
                    try { fs.unlinkSync(file.path); } catch (e) {}
                    return null;
                }

                log(`Uploading to Cloudinary: ${file.originalname} (${file.size} bytes)`);

                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'synergy-mobiles',
                    use_filename: true,
                    unique_filename: false,
                });
                
                try {
                    fs.unlinkSync(file.path);
                } catch (unlinkError) {
                    log(`Failed to delete local file ${file.path}: ${unlinkError.message}`);
                }
                
                log(`Success: ${file.originalname} -> ${result.secure_url}`);
                return result.secure_url;
            } catch (err) {
                log(`Cloudinary Upload Failed for ${file.originalname}: ${err.message}`);
                if (err.http_code) log(`Cloudinary Error Code: ${err.http_code}`);
                
                if (fs.existsSync(file.path)) {
                    try {
                        fs.unlinkSync(file.path);
                    } catch (unlinkError) {}
                }
                return null;
            }
        });

        const results = await Promise.all(uploadPromises);
        const imageUrls = results.filter(url => url !== null);

        if (imageUrls.length === 0 && req.files.length > 0) {
             log('All uploads failed to Cloudinary');
             return res.status(500).json({ message: 'All image uploads failed' });
        }

        log(`Returning ${imageUrls.length} successful URLs`);
        res.json(imageUrls);
    } catch (error) {
        log(`General Upload Route Error: ${error.message}`);
        res.status(500).json({ message: 'Server error during upload', error: error.message });
    }
});

module.exports = router;
