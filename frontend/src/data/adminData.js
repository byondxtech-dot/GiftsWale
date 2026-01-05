// Mock data for Admin Dashboard

export const dashboardStats = {
    averageRevenue: {
        value: 25565,
        change: 20,
        previousValue: 20452,
        trend: 'up'
    },
    customerReturn: {
        value: 7956,
        change: 15,
        previousValue: 6759,
        trend: 'up'
    }
};

export const revenueData = [
    { month: 'Jan', revenue: 200, orders: 150 },
    { month: 'Feb', revenue: 350, orders: 200 },
    { month: 'Mar', revenue: 300, orders: 180 },
    { month: 'Apr', revenue: 450, orders: 280 },
    { month: 'May', revenue: 400, orders: 320 },
    { month: 'Jun', revenue: 550, orders: 380 },
    { month: 'Jul', revenue: 456, orders: 350 },
    { month: 'Aug', revenue: 380, orders: 290 },
    { month: 'Sep', revenue: 520, orders: 400 },
    { month: 'Oct', revenue: 600, orders: 450 },
    { month: 'Nov', revenue: 750, orders: 520 },
    { month: 'Dec', revenue: 900, orders: 600 }
];

export const salesByCategory = [
    { name: 'Women', value: 22, color: '#6366f1' },
    { name: 'Men', value: 22, color: '#f59e0b' },
    { name: 'Kids', value: 7, color: '#ef4444' },
    { name: 'Home', value: 20, color: '#10b981' },
    { name: 'Wellness', value: 34, color: '#8b5cf6' }
];

export const recentInvoices = [
    { id: 1, no: 1, customerId: '#6545', customerName: 'Jane Cooper', city: 'Sydney', orderDate: '01 Oct | 11:29 am', status: 'Paid', amount: 64 },
    { id: 2, no: 2, customerId: '#5412', customerName: 'Wade Warren', city: 'Perth', orderDate: '01 Oct | 11:45 am', status: 'Paid', amount: 557 },
    { id: 3, no: 3, customerId: '#6622', customerName: 'Jenny Wilson', city: 'Darwin', orderDate: '01 Oct | 12:10 pm', status: 'Pending', amount: 156 },
    { id: 4, no: 4, customerId: '#6462', customerName: 'Robert Fox', city: 'Albany', orderDate: '01 Oct | 01:15 pm', status: 'Paid', amount: 265 },
    { id: 5, no: 5, customerId: '#7823', customerName: 'Emily Davis', city: 'Melbourne', orderDate: '01 Oct | 02:30 pm', status: 'Pending', amount: 189 },
    { id: 6, no: 6, customerId: '#8934', customerName: 'Michael Brown', city: 'Brisbane', orderDate: '01 Oct | 03:45 pm', status: 'Paid', amount: 432 }
];

export const topProducts = [
    { id: 1, name: 'Speed Force: Knit', category: 'Women', percentage: 35, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
    { id: 2, name: 'Assorted Cross Bag', category: 'Well', percentage: 31, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop' },
    { id: 3, name: 'Fur Pom Pom Gloves', category: 'Men', percentage: 20, image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=100&h=100&fit=crop' },
    { id: 4, name: 'Happy Days Wax Candle', category: 'Women', percentage: 15, image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=100&h=100&fit=crop' },
    { id: 5, name: 'Short Bodysuits - White', category: 'Kids', percentage: 12, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=100&h=100&fit=crop' }
];

export const products = [
    { id: 1, name: 'Speed Force: Knit', category: 'Women', price: 129.99, stock: 45, status: 'Active' },
    { id: 2, name: 'Assorted Cross Bag', category: 'Accessories', price: 89.99, stock: 23, status: 'Active' },
    { id: 3, name: 'Fur Pom Pom Gloves', category: 'Men', price: 49.99, stock: 67, status: 'Active' },
    { id: 4, name: 'Happy Days Wax Candle', category: 'Home', price: 34.99, stock: 120, status: 'Active' },
    { id: 5, name: 'Short Bodysuits', category: 'Kids', price: 24.99, stock: 89, status: 'Low Stock' }
];

export const orders = [
    { id: 1, orderId: 'ORD-001', customer: 'Jane Cooper', total: 234.56, status: 'Delivered', date: '2026-01-01' },
    { id: 2, orderId: 'ORD-002', customer: 'Wade Warren', total: 567.89, status: 'Processing', date: '2026-01-02' },
    { id: 3, orderId: 'ORD-003', customer: 'Jenny Wilson', total: 123.45, status: 'Pending', date: '2026-01-03' }
];

export const sidebarMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/admin/dashboard' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics', path: '/admin/analytics' },
    { id: 'products', label: 'Products', icon: 'products', path: '/admin/products' },
    { id: 'payment', label: 'Payment', icon: 'payment', path: '/admin/payment' },
    { id: 'orders', label: 'Orders', icon: 'orders', path: '/admin/orders' },
    { id: 'enquiry', label: 'Enquiry', icon: 'enquiry', path: '/admin/enquiry' },
    { id: 'marketing', label: 'Marketing', icon: 'marketing', path: '/admin/marketing' },
    { id: 'setting', label: 'Setting', icon: 'setting', path: '/admin/setting' }
];

export const userMenuItems = [
    { id: 'user', label: 'User', icon: 'user', path: '/admin/user' },
    { id: 'logout', label: 'Logout', icon: 'logout', path: '/logout' }
];
