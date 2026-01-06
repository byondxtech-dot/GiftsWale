import { useState } from 'react';

const Payment = () => {
  const [transactions] = useState([
    { id: 1, transactionId: 'TXN001234', customer: 'Jane Cooper', amount: 2499, method: 'UPI', status: 'Success', date: '2026-01-03 11:30 AM' },
    { id: 2, transactionId: 'TXN001235', customer: 'Wade Warren', amount: 5670, method: 'Card', status: 'Success', date: '2026-01-03 10:45 AM' },
    { id: 3, transactionId: 'TXN001236', customer: 'Jenny Wilson', amount: 1899, method: 'UPI', status: 'Pending', date: '2026-01-03 10:20 AM' },
    { id: 4, transactionId: 'TXN001237', customer: 'Robert Fox', amount: 3450, method: 'Net Banking', status: 'Failed', date: '2026-01-03 09:55 AM' },
    { id: 5, transactionId: 'TXN001238', customer: 'Emily Davis', amount: 7890, method: 'Card', status: 'Success', date: '2026-01-03 09:30 AM' },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTransactions = transactions.filter(t =>
    filterStatus === 'all' || t.status.toLowerCase() === filterStatus
  );

  const stats = {
    totalRevenue: transactions.filter(t => t.status === 'Success').reduce((sum, t) => sum + t.amount, 0),
    pendingAmount: transactions.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0),
    successRate: Math.round((transactions.filter(t => t.status === 'Success').length / transactions.length) * 100),
    totalTransactions: transactions.length
  };

  const statusColors = {
    success: { bg: '#dcfce7', color: '#16a34a' },
    pending: { bg: '#fef3c7', color: '#d97706' },
    failed: { bg: '#fee2e2', color: '#dc2626' }
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <h2>Payments</h2>
        <p>Track all payment transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="payment-stats">
        <div className="payment-stat-card">
          <div className="stat-icon green">₹</div>
          <div className="stat-info">
            <span className="stat-value">₹{stats.totalRevenue.toLocaleString()}</span>
            <span className="stat-label">Total Revenue</span>
          </div>
        </div>
        <div className="payment-stat-card">
          <div className="stat-icon orange">⏳</div>
          <div className="stat-info">
            <span className="stat-value">₹{stats.pendingAmount.toLocaleString()}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        <div className="payment-stat-card">
          <div className="stat-icon blue">📊</div>
          <div className="stat-info">
            <span className="stat-value">{stats.successRate}%</span>
            <span className="stat-label">Success Rate</span>
          </div>
        </div>
        <div className="payment-stat-card">
          <div className="stat-icon purple">#</div>
          <div className="stat-info">
            <span className="stat-value">{stats.totalTransactions}</span>
            <span className="stat-label">Transactions</span>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="payment-filter">
        {['all', 'success', 'pending', 'failed'].map((status) => (
          <button
            key={status}
            className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
            onClick={() => {
              setFilterStatus(status);
              console.log('💳 Filter:', status);
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="payment-table-card">
        <table className="payment-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn) => (
              <tr key={txn.id} onClick={() => console.log('💳 Transaction:', txn)}>
                <td className="txn-id">{txn.transactionId}</td>
                <td>{txn.customer}</td>
                <td className="amount">₹{txn.amount.toLocaleString()}</td>
                <td>
                  <span className="method-badge">{txn.method}</span>
                </td>
                <td>
                  <span
                    className="status-badge"
                    style={{
                      background: statusColors[txn.status.toLowerCase()]?.bg,
                      color: statusColors[txn.status.toLowerCase()]?.color
                    }}
                  >
                    {txn.status}
                  </span>
                </td>
                <td className="date">{txn.date}</td>
                <td>
                  <button className="view-btn" onClick={(e) => {
                    e.stopPropagation();
                    console.log('👁️ View transaction:', txn);
                  }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .payment-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .payment-header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
        }

        .payment-header p {
          font-size: 14px;
          color: #6b7280;
          margin-top: 4px;
        }

        .payment-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .payment-stat-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 600;
        }

        .stat-icon.green { background: #dcfce7; color: #16a34a; }
        .stat-icon.orange { background: #fef3c7; color: #d97706; }
        .stat-icon.blue { background: #dbeafe; color: #2563eb; }
        .stat-icon.purple { background: #f3e8ff; color: #9333ea; }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
        }

        .stat-label {
          font-size: 13px;
          color: #6b7280;
        }

        .payment-filter {
          display: flex;
          gap: 8px;
        }

        .filter-btn {
          padding: 8px 16px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          border-radius: 8px;
          font-size: 14px;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn.active {
          background: #111827;
          color: #ffffff;
          border-color: #111827;
        }

        .payment-table-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .payment-table {
          width: 100%;
          border-collapse: collapse;
        }

        .payment-table th {
          text-align: left;
          padding: 16px 24px;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }

        .payment-table td {
          padding: 16px 24px;
          font-size: 14px;
          color: #374151;
          border-bottom: 1px solid #f3f4f6;
        }

        .payment-table tr:hover {
          background: #f9fafb;
          cursor: pointer;
        }

        .txn-id {
          font-weight: 600;
          color: #111827;
          font-family: monospace;
        }

        .amount {
          font-weight: 600;
          color: #111827;
        }

        .method-badge {
          padding: 4px 10px;
          background: #f3f4f6;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .date {
          color: #6b7280;
          font-size: 13px;
        }

        .view-btn {
          padding: 6px 12px;
          background: #eef2ff;
          color: #6366f1;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }

        .view-btn:hover {
          background: #e0e7ff;
        }

        @media (max-width: 1024px) {
          .payment-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div >
  );
};

export default Payment;
