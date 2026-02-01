const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all products
router.get('/', async (req, res) => {
    try {
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        } : {};

        const products = await Product.find({ ...keyword });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create product
router.post('/', protect, admin, async (req, res) => {
    try {
        const { 
            name, 
            slug,
            price, 
            originalPrice,
            description, 
            image,
            images, 
            brand, 
            category, 
            stock,
            isFeatured,
            isHotDeal,
            isNewArrival,
            features,
            specifications,
            videoLink
        } = req.body;

        // Validate required fields
        if (!name || !price || !description || !brand || !category) {
            return res.status(400).json({ 
                message: 'Please provide all required fields: name, price, description, brand, category' 
            });
        }

        // Validate images
        if (!image && (!images || images.length === 0)) {
            return res.status(400).json({ 
                message: 'Please provide at least one product image' 
            });
        }

        const product = new Product({
            name,
            slug: slug || name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
            price: parseFloat(price),
            discountPrice: originalPrice ? parseFloat(originalPrice) : undefined,
            description,
            image: image || images[0],
            images: images || [image],
            brand,
            category,
            stock: parseInt(stock) || 0,
            features: features || [],
            specifications: specifications || {},
            videoLink: videoLink || '',
            isFeatured: isFeatured || false,
            isBestSeller: isHotDeal || isNewArrival || false,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Product Creation Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Update product
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = req.body.name || product.name;
            product.price = req.body.price || product.price;
            product.description = req.body.description || product.description;
            product.images = req.body.images || product.images;
            product.brand = req.body.brand || product.brand;
            product.category = req.body.category || product.category;
            product.stock = req.body.stock || product.stock;
            product.features = req.body.features || product.features;
            product.specifications = req.body.specifications || product.specifications;
            product.videoLink = req.body.videoLink !== undefined ? req.body.videoLink : product.videoLink;
            product.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : product.isFeatured;
            product.isBestSeller = req.body.isBestSeller !== undefined ? req.body.isBestSeller : product.isBestSeller;

            if (req.body.name) {
                 product.slug = req.body.name.toLowerCase().split(' ').join('-');
            }

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete product
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
