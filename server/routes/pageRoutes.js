const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/:slug', async (req, res) => {
    try {
        const page = await Page.findOne({ slug: req.params.slug });
        if (page) {
            res.json(page);
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:slug', protect, admin, async (req, res) => {
    try {
        const page = await Page.findOne({ slug: req.params.slug });
        if (page) {
            page.title = req.body.title || page.title;
            page.content = req.body.content || page.content;
            page.metaTitle = req.body.metaTitle || page.metaTitle;
            page.metaDescription = req.body.metaDescription || page.metaDescription;
            const updatedPage = await page.save();
            res.json(updatedPage);
        } else {
            // Create if not exists (upsert-ish logic)
            const newPage = new Page({
                title: req.body.title,
                slug: req.params.slug,
                content: req.body.content,
                metaTitle: req.body.metaTitle,
                metaDescription: req.body.metaDescription,
            });
            const createdPage = await newPage.save();
            res.status(201).json(createdPage);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
