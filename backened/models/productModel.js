
import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Women', 'Men', 'Kids', 'Home', 'Accessories', 'Electronics', 'Beauty', 'Sports']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    comparePrice: {
        type: Number,
        min: 0,
        default: null
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: 0,
        default: 0
    },
    brand: {
        type: String,
        trim: true
    },
    sku: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
    },
    images: [{
        url: { type: String, required: true },
        publicId: { type: String, required: true }
    }],
    status: {
        type: String,
        enum: ['Active', 'Low Stock', 'Out of Stock', 'Draft'],
        default: 'Active'
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String,
        trim: true
    }]
}, { timestamps: true });

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;
