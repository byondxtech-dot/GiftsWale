
import productModel from '../models/productModel.js';
import cloudinary from '../config/cloudinary.js';

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const { category, status, search, sort } = req.query;

        let query = {};

        if (category) query.category = category;
        if (status) query.status = status;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } }
            ];
        }

        let sortOption = { createdAt: -1 };
        if (sort === 'price_asc') sortOption = { price: 1 };
        if (sort === 'price_desc') sortOption = { price: -1 };
        if (sort === 'name') sortOption = { name: 1 };

        const products = await productModel.find(query).sort(sortOption);

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// Get single product
export const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
};

// Create product
export const createProduct = async (req, res) => {
    try {
        const { name, description, category, price, comparePrice, stock, brand, sku, status, isFeatured, tags } = req.body;

        // Upload images to Cloudinary
        const images = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                try {
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'giftswale/products',
                        timeout: 120000, // 2 minute timeout
                        resource_type: 'image',
                        // Transform images: resize, optimize quality, convert to webp
                        transformation: [
                            { width: 1000, height: 1000, crop: 'limit' }, // Max 1000x1000
                            { quality: 'auto:good' }, // Auto quality optimization
                            { fetch_format: 'auto' } // Auto format (webp for supported browsers)
                        ]
                    });

                    images.push({
                        url: result.secure_url,
                        publicId: result.public_id
                    });

                    // Delete local file after upload
                    const fs = await import('fs');
                    fs.unlink(file.path, (err) => {
                        if (err) console.log('Error deleting temp file:', err);
                    });
                } catch (uploadError) {
                    console.error('Error uploading image to Cloudinary:', uploadError);
                    // Continue with other images if one fails
                }
            }
        }

        // Auto-calculate status based on stock
        const stockNum = parseInt(stock);
        let productStatus = status || 'Active';
        if (stockNum === 0) {
            productStatus = 'Out of Stock';
        } else if (stockNum <= 10) {
            productStatus = 'Low Stock';
        }

        const product = await productModel.create({
            name,
            description,
            category,
            price: parseFloat(price),
            comparePrice: comparePrice ? parseFloat(comparePrice) : null,
            stock: stockNum,
            brand,
            sku,
            images,
            status: productStatus,
            isFeatured: isFeatured === 'true' || isFeatured === true,
            tags: tags ? (typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags) : []
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, price, comparePrice, stock, brand, sku, status, isFeatured, tags, existingImages } = req.body;

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Handle existing images - parse if it's a string
        let keepImages = [];
        if (existingImages) {
            keepImages = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
        }

        // Delete removed images from Cloudinary
        const imagesToDelete = product.images.filter(
            img => !keepImages.some(kept => kept.publicId === img.publicId)
        );

        for (const img of imagesToDelete) {
            await cloudinary.uploader.destroy(img.publicId);
        }

        // Upload new images
        const newImages = [...keepImages];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'giftswale/products',
                    transformation: [
                        { width: 800, height: 800, crop: 'limit' },
                        { quality: 'auto' }
                    ]
                });

                newImages.push({
                    url: result.secure_url,
                    publicId: result.public_id
                });
            }
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            {
                name,
                description,
                category,
                price: parseFloat(price),
                comparePrice: comparePrice ? parseFloat(comparePrice) : null,
                stock: parseInt(stock),
                brand,
                sku,
                images: newImages,
                status,
                isFeatured: isFeatured === 'true' || isFeatured === true,
                tags: tags ? (typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags) : []
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Delete images from Cloudinary
        for (const img of product.images) {
            await cloudinary.uploader.destroy(img.publicId);
        }

        await productModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
};
