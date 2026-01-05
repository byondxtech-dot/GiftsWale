import { useState } from 'react';
import { getRecentInvoices, deleteInvoice } from '../../services/adminService';

const InvoiceTable = () => {
    const [invoices] = useState(() => getRecentInvoices());

    const handleDelete = (id) => {
        const result = deleteInvoice(id);
        console.log('Delete result:', result);
        // In real app, would update state here
    };

    return (
        <div className="admin-table-card">
            <div className="admin-table-header">
                <h3>Recent Invoice</h3>
                <button className="admin-filter-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    Filter
                </button>
            </div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id Customer</th>
                        <th>Customer Name</th>
                        <th>City</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id} onClick={() => handleDelete(invoice.id)} style={{ cursor: 'pointer' }}>
                            <td>{invoice.no}.</td>
                            <td>{invoice.customerId}</td>
                            <td>{invoice.customerName}</td>
                            <td>{invoice.city}</td>
                            <td>{invoice.orderDate}</td>
                            <td>
                                <span className={`admin-status ${invoice.status.toLowerCase()}`}>
                                    <span className="admin-status-dot"></span>
                                    {invoice.status}
                                </span>
                            </td>
                            <td>${invoice.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceTable;
