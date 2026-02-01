const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    image: { type: String, required: true },
    images: [{ type: String }],
    brand: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    features: [{ type: String }],
    specifications: { type: Map, of: String },
    videoLink: { type: String }, // URL to product video (YouTube, TikTok, etc.)
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
