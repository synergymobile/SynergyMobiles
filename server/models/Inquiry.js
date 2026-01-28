const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    status: { type: String, enum: ['new', 'read', 'contacted'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
