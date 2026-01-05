import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getOrders, updateOrder, deleteOrder } from '../../services/adminService';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const data = getOrders();
        setOrders(data);
    }, []);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = (orderId, newStatus) => {
        const updated = updateOrder(orderId, { status: newStatus });
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        console.log('📦 Order status updated:', updated);
    };

    const handleDelete = (orderId) => {
        const result = deleteOrder(orderId);
        setOrders(orders.filter(o => o.id !== orderId));
        console.log('🗑️ Order deleted:', result);
    };

    const statusColors = {
        delivered: { bg: '#dcfce7', color: '#16a34a' },
        processing: { bg: '#dbeafe', color: '#2563eb' },
        pending: { bg: '#fef3c7', color: '#d97706' },
        cancelled: { bg: '#fee2e2', color: '#dc2626' }
    };

    return (
        <AdminLayout>
            <div className="orders-page">
                {/* Header */}
                <div className="orders-header">
                    <div>
                        <h2>Orders</h2>
                        <p>{orders.length} total orders</p>
                    </div>
                    <div className="orders-actions">
                        <div className="orders-search">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search orders..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="filter-tabs">
                    {['all', 'pending', 'processing', 'delivered', 'cancelled'].map((status) => (
                        <button
                            key={status}
                            className={`filter-tab ${filterStatus === status ? 'active' : ''}`}
                            onClick={() => {
                                setFilterStatus(status);
                                console.log('🔍 Filter changed to:', status);
                            }}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                            {status === 'all' && <span className="tab-count">{orders.length}</span>}
                        </button>
                    ))}
                </div>

                {/* Orders Table */}
                <div className="orders-table-card">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td className="order-id">{order.orderId}</td>
                                    <td>
                                        <div className="customer-cell">
                                            <div className="customer-avatar">
                                                {order.customer.charAt(0)}
                                            </div>
                                            <span>{order.customer}</span>
                                        </div>
                                    </td>
                                    <td>{order.date}</td>
                                    <td className="order-total">${order.total.toFixed(2)}</td>
                                    <td>
                                        <select
                                            className="status-select"
                                            value={order.status.toLowerCase()}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            style={{
                                                background: statusColors[order.status.toLowerCase()]?.bg || '#f3f4f6',
                                                color: statusColors[order.status.toLowerCase()]?.color || '#374151'
                                            }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="action-btn view" onClick={() => console.log('👁️ View order:', order)}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            </button>
                                            <button className="action-btn delete" onClick={() => handleDelete(order.id)}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredOrders.length === 0 && (
                        <div className="empty-state">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                            <p>No orders found</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .orders-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .orders-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .orders-header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
        }

        .orders-header p {
          font-size: 14px;
          color: #6b7280;
          margin-top: 4px;
        }

        .orders-search {
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 10px 16px;
          min-width: 280px;
        }

        .orders-search input {
          border: none;
          outline: none;
          margin-left: 8px;
          font-size: 14px;
          width: 100%;
          background: transparent;
        }

        .filter-tabs {
          display: flex;
          gap: 8px;
          background: #ffffff;
          padding: 6px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          width: fit-content;
        }

        .filter-tab {
          padding: 8px 16px;
          border: none;
          background: transparent;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-tab.active {
          background: #111827;
          color: #ffffff;
        }

        .tab-count {
          background: rgba(255,255,255,0.2);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 12px;
        }

        .filter-tab.active .tab-count {
          background: rgba(255,255,255,0.2);
        }

        .orders-table-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }

        .orders-table th {
          text-align: left;
          padding: 16px 24px;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }

        .orders-table td {
          padding: 16px 24px;
          font-size: 14px;
          color: #374151;
          border-bottom: 1px solid #f3f4f6;
        }

        .orders-table tr:hover {
          background: #f9fafb;
        }

        .order-id {
          font-weight: 600;
          color: #111827;
        }

        .customer-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .customer-avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
        }

        .order-total {
          font-weight: 600;
          color: #111827;
        }

        .status-select {
          padding: 6px 12px;
          border: none;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          outline: none;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .action-btn.view {
          background: #eef2ff;
          color: #6366f1;
        }

        .action-btn.view:hover {
          background: #e0e7ff;
        }

        .action-btn.delete {
          background: #fef2f2;
          color: #ef4444;
        }

        .action-btn.delete:hover {
          background: #fee2e2;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          color: #9ca3af;
        }

        .empty-state p {
          margin-top: 16px;
          font-size: 14px;
        }
      `}</style>
        </AdminLayout>
    );
};

export default Orders;
