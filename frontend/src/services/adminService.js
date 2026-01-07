// Admin Service - CRUD Operations with console.log
// Database se connect hone ke baad ye functions update honge

import {
    revenueData,
    recentInvoices,
    topProducts,
    orders
} from '../data/adminData';

const API_BASE = 'http://localhost:4000/api';

// Dashboard Stats - Real API
export const getStats = async () => {
    try {
        const response = await fetch(`${API_BASE}/dashboard/stats`);
        const data = await response.json();
        console.log('📊 Fetching Dashboard Stats:', data);
        return data.stats || null;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return null;
    }
};

export const getRevenueData = () => {
    console.log('📈 Fetching Revenue Data:', revenueData);
    return revenueData;
};

export const getSalesByCategory = async () => {
    try {
        const response = await fetch(`${API_BASE}/dashboard/sales-by-category`);
        const data = await response.json();
        console.log('🥧 Fetching Sales by Category:', data);
        return data.salesData || [];
    } catch (error) {
        console.error('Error fetching sales by category:', error);
        return [];
    }
};

export const getTopProducts = async () => {
    try {
        const response = await fetch(`${API_BASE}/dashboard/stats`);
        const data = await response.json();
        console.log('🔥 Fetching Top Products:', data.topProducts);
        return data.topProducts || [];
    } catch (error) {
        console.error('Error fetching top products:', error);
        return topProducts; // Fallback to mock
    }
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

// Products - Real API calls

export const getProducts = async () => {
    try {
        const response = await fetch(`${API_BASE}/products`);
        const data = await response.json();
        console.log('📦 Fetching Products:', data);
        return data.products || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const createProduct = async (formData) => {
    try {
        const response = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log('✅ Product Created:', data);
        return data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const updateProduct = async (id, formData) => {
    try {
        const response = await fetch(`${API_BASE}/products/${id}`, {
            method: 'PUT',
            body: formData
        });
        const data = await response.json();
        console.log('✅ Product Updated:', data);
        return data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/products/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log('🗑️ Product Deleted:', data);
        return data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
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
