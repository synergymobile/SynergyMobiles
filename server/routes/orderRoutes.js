const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        transactionId
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            transactionId
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

module.exports = router;
