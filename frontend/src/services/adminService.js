// Admin Service - CRUD Operations with console.log
// Database se connect hone ke baad ye functions update honge

import {
    dashboardStats,
    revenueData,
    salesByCategory,
    recentInvoices,
    topProducts,
    products,
    orders
} from '../data/adminData';

// Dashboard Stats
export const getStats = () => {
    console.log('📊 Fetching Dashboard Stats:', dashboardStats);
    return dashboardStats;
};

export const getRevenueData = () => {
    console.log('📈 Fetching Revenue Data:', revenueData);
    return revenueData;
};

export const getSalesByCategory = () => {
    console.log('🥧 Fetching Sales by Category:', salesByCategory);
    return salesByCategory;
};

// Invoices/Orders
export const getRecentInvoices = () => {
    console.log('🧾 Fetching Recent Invoices:', recentInvoices);
    return recentInvoices;
};

export const createInvoice = (invoiceData) => {
    console.log('➕ Creating Invoice:', invoiceData);
    const newInvoice = {
        id: recentInvoices.length + 1,
        no: recentInvoices.length + 1,
        ...invoiceData
    };
    console.log('✅ Invoice Created:', newInvoice);
    return newInvoice;
};

export const updateInvoice = (id, invoiceData) => {
    console.log(`📝 Updating Invoice ${id}:`, invoiceData);
    const updatedInvoice = { id, ...invoiceData };
    console.log('✅ Invoice Updated:', updatedInvoice);
    return updatedInvoice;
};

export const deleteInvoice = (id) => {
    console.log(`🗑️ Deleting Invoice ${id}`);
    console.log('✅ Invoice Deleted');
    return { success: true, deletedId: id };
};

// Products
export const getProducts = () => {
    console.log('📦 Fetching Products:', products);
    return products;
};

export const getTopProducts = () => {
    console.log('🔥 Fetching Top Products:', topProducts);
    return topProducts;
};

export const createProduct = (productData) => {
    console.log('➕ Creating Product:', productData);
    const newProduct = {
        id: products.length + 1,
        ...productData,
        status: 'Active'
    };
    console.log('✅ Product Created:', newProduct);
    return newProduct;
};

export const updateProduct = (id, productData) => {
    console.log(`📝 Updating Product ${id}:`, productData);
    const updatedProduct = { id, ...productData };
    console.log('✅ Product Updated:', updatedProduct);
    return updatedProduct;
};

export const deleteProduct = (id) => {
    console.log(`🗑️ Deleting Product ${id}`);
    console.log('✅ Product Deleted');
    return { success: true, deletedId: id };
};

// Orders
export const getOrders = () => {
    console.log('📋 Fetching Orders:', orders);
    return orders;
};

export const createOrder = (orderData) => {
    console.log('➕ Creating Order:', orderData);
    const newOrder = {
        id: orders.length + 1,
        orderId: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
        ...orderData
    };
    console.log('✅ Order Created:', newOrder);
    return newOrder;
};

export const updateOrder = (id, orderData) => {
    console.log(`📝 Updating Order ${id}:`, orderData);
    const updatedOrder = { id, ...orderData };
    console.log('✅ Order Updated:', updatedOrder);
    return updatedOrder;
};

export const deleteOrder = (id) => {
    console.log(`🗑️ Deleting Order ${id}`);
    console.log('✅ Order Deleted');
    return { success: true, deletedId: id };
};
