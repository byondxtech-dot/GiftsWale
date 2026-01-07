
import productModel from '../models/productModel.js';

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
    try {
        // Get total products count
        const totalProducts = await productModel.countDocuments();

        // Get products by status
        const activeProducts = await productModel.countDocuments({ status: 'Active' });
        const lowStockProducts = await productModel.countDocuments({ status: 'Low Stock' });
        const outOfStockProducts = await productModel.countDocuments({ status: 'Out of Stock' });

        // Get total inventory value
        const products = await productModel.find({}, 'price stock');
        const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

        // Get products by category
        const categoryStats = await productModel.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 }, totalValue: { $sum: { $multiply: ['$price', '$stock'] } } } },
            { $sort: { count: -1 } }
        ]);

        // Get top products by stock value
        const topProducts = await productModel.find()
            .sort({ price: -1 })
            .limit(5)
            .select('name category price stock images');

        // Get recent products
        const recentProducts = await productModel.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name category price stock status createdAt');

        res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                activeProducts,
                lowStockProducts,
                outOfStockProducts,
                totalInventoryValue: Math.round(totalInventoryValue),
                // For the stats cards
                averageRevenue: {
                    value: totalInventoryValue,
                    change: 20,
                    previousValue: Math.round(totalInventoryValue * 0.8),
                    trend: 'up'
                },
                customerReturn: {
                    value: totalProducts,
                    change: 15,
                    previousValue: Math.round(totalProducts * 0.85),
                    trend: 'up'
                }
            },
            categoryStats,
            topProducts,
            recentProducts
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard stats',
            error: error.message
        });
    }
};

// Get sales by category for pie chart
export const getSalesByCategory = async (req, res) => {
    try {
        const categoryColors = {
            'Women': '#6366f1',
            'Men': '#f59e0b',
            'Kids': '#ef4444',
            'Home': '#10b981',
            'Accessories': '#8b5cf6',
            'Electronics': '#06b6d4',
            'Beauty': '#ec4899',
            'Sports': '#84cc16'
        };

        const categories = await productModel.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const salesData = categories.map(cat => ({
            name: cat._id,
            value: cat.count,
            color: categoryColors[cat._id] || '#9ca3af'
        }));

        res.status(200).json({
            success: true,
            salesData
        });
    } catch (error) {
        console.error('Error fetching sales by category:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching sales by category',
            error: error.message
        });
    }
};
