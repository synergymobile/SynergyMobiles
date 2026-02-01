const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
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

router.post('/', protect, admin, upload.array('images', 3), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }

        console.log('--- Upload Request Processing ---');
        console.log('Files received:', req.files.map(f => `${f.originalname} (${f.size} bytes)`));

        const uploadPromises = req.files.map(async (file) => {
            try {
                // Verify file exists and has size
                if (!fs.existsSync(file.path)) {
                    console.error(`File missing at path: ${file.path}`);
                    return null;
                }
                
                if (file.size === 0) {
                    console.error(`File is empty (0 bytes): ${file.originalname}`);
                    try { fs.unlinkSync(file.path); } catch (e) {}
                    return null;
                }

                console.log(`Uploading to Cloudinary: ${file.path}`);

                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'synergy-mobiles',
                    use_filename: true,
                    unique_filename: false,
                });
                
                // Remove file from local storage after upload
                try {
                    fs.unlinkSync(file.path);
                } catch (unlinkError) {
                    console.warn(`Failed to delete local file ${file.path}:`, unlinkError.message);
                }
                
                console.log(`Success: ${file.filename} -> ${result.secure_url}`);
                return result.secure_url;
            } catch (err) {
                console.error(`Cloudinary Upload Failed for ${file.filename}:`, err.message);
                // Try to remove local file even if upload fails
                if (fs.existsSync(file.path)) {
                    try {
                        fs.unlinkSync(file.path);
                    } catch (unlinkError) {}
                }
                return null; // Return null for failed uploads
            }
        });

        // Wait for all uploads to complete (success or failure)
        const results = await Promise.all(uploadPromises);
        
        // Filter out failed uploads
        const imageUrls = results.filter(url => url !== null);

        if (imageUrls.length === 0 && req.files.length > 0) {
             console.error('All uploads failed.');
             return res.status(500).json({ message: 'All image uploads failed. Check server logs.' });
        }

        console.log('Returning successful URLs:', imageUrls);
        res.json(imageUrls);
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        res.status(500).json({ message: 'Failed to upload images' });
    }
});

module.exports = router;
