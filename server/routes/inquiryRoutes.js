const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message, product } = req.body;
        const inquiry = new Inquiry({ name, email, phone, message, product });
        const createdInquiry = await inquiry.save();
        res.status(201).json(createdInquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', protect, admin, async (req, res) => {
    try {
        const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
