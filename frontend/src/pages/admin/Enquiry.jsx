import { useState } from 'react';

const Enquiry = () => {
  const [enquiries, setEnquiries] = useState([
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', subject: 'Order not delivered', message: 'My order #ORD-001 has not been delivered yet. It has been 5 days.', status: 'Open', date: '2026-01-03', priority: 'High' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', subject: 'Product query', message: 'Is the gift box customizable? I want to add a personal message.', status: 'In Progress', date: '2026-01-02', priority: 'Medium' },
    { id: 3, name: 'Amit Kumar', email: 'amit@example.com', subject: 'Refund request', message: 'I received a damaged product. Please process my refund.', status: 'Open', date: '2026-01-02', priority: 'High' },
    { id: 4, name: 'Sneha Gupta', email: 'sneha@example.com', subject: 'Bulk order inquiry', message: 'I want to order 50 gift hampers for corporate gifting. What discount can you offer?', status: 'Resolved', date: '2026-01-01', priority: 'Low' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', subject: 'Shipping to remote area', message: 'Do you deliver to Leh? What are the shipping charges?', status: 'Open', date: '2026-01-01', priority: 'Medium' },
  ]);

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [reply, setReply] = useState('');

  const filteredEnquiries = enquiries.filter(e =>
    filterStatus === 'all' || e.status.toLowerCase().replace(' ', '-') === filterStatus
  );

  const handleStatusChange = (id, newStatus) => {
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
    console.log('📝 Status updated:', { id, newStatus });
  };

  const handleReply = () => {
    if (reply.trim() && selectedEnquiry) {
      console.log('📧 Reply sent:', { enquiryId: selectedEnquiry.id, reply });
      setReply('');
      handleStatusChange(selectedEnquiry.id, 'Resolved');
      setSelectedEnquiry(null);
      alert('Reply sent successfully!');
    }
  };

  const priorityColors = {
    high: { bg: '#fee2e2', color: '#dc2626' },
    medium: { bg: '#fef3c7', color: '#d97706' },
    low: { bg: '#dcfce7', color: '#16a34a' }
  };

  const statusColors = {
    open: { bg: '#dbeafe', color: '#2563eb' },
    'in-progress': { bg: '#fef3c7', color: '#d97706' },
    resolved: { bg: '#dcfce7', color: '#16a34a' }
  };

  return (
    <div className="enquiry-page">
      <div className="enquiry-header">
        <div>
          <h2>Customer Enquiries</h2>
          <p>{enquiries.filter(e => e.status === 'Open').length} open enquiries</p>
        </div>
      </div>

      {/* Stats */}
      <div className="enquiry-stats">
        <div className="stat-card">
          <div className="stat-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <span className="stat-number">{enquiries.filter(e => e.status === 'Open').length}</span>
          <span className="stat-label">Open</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
            </svg>
          </div>
          <span className="stat-number">{enquiries.filter(e => e.status === 'In Progress').length}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <span className="stat-number">{enquiries.filter(e => e.status === 'Resolved').length}</span>
          <span className="stat-label">Resolved</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <span className="stat-number">{enquiries.filter(e => e.priority === 'High').length}</span>
          <span className="stat-label">High Priority</span>
        </div>
      </div>

      {/* Filter */}
      <div className="enquiry-filter">
        {['all', 'open', 'in-progress', 'resolved'].map((status) => (
          <button
            key={status}
            className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
            onClick={() => setFilterStatus(status)}
          >
            {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="enquiry-container">
        {/* Enquiry List */}
        <div className="enquiry-list">
          {filteredEnquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className={`enquiry-card ${selectedEnquiry?.id === enquiry.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedEnquiry(enquiry);
                console.log('📋 Enquiry selected:', enquiry);
              }}
            >
              <div className="enquiry-card-header">
                <div className="enquiry-info">
                  <span className="enquiry-name">{enquiry.name}</span>
                  <span className="enquiry-email">{enquiry.email}</span>
                </div>
                <span
                  className="priority-badge"
                  style={{
                    background: priorityColors[enquiry.priority.toLowerCase()]?.bg,
                    color: priorityColors[enquiry.priority.toLowerCase()]?.color
                  }}
                >
                  {enquiry.priority}
                </span>
              </div>
              <div className="enquiry-subject">{enquiry.subject}</div>
              <div className="enquiry-card-footer">
                <span
                  className="status-badge"
                  style={{
                    background: statusColors[enquiry.status.toLowerCase().replace(' ', '-')]?.bg,
                    color: statusColors[enquiry.status.toLowerCase().replace(' ', '-')]?.color
                  }}
                >
                  {enquiry.status}
                </span>
                <span className="enquiry-date">{enquiry.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Enquiry Detail */}
        {selectedEnquiry ? (
          <div className="enquiry-detail">
            <div className="detail-header">
              <h3>{selectedEnquiry.subject}</h3>
              <select
                value={selectedEnquiry.status}
                onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                className="status-select"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div className="detail-meta">
              <span><strong>From:</strong> {selectedEnquiry.name} ({selectedEnquiry.email})</span>
              <span><strong>Date:</strong> {selectedEnquiry.date}</span>
            </div>
            <div className="detail-message">
              <p>{selectedEnquiry.message}</p>
            </div>
            <div className="reply-section">
              <h4>Reply</h4>
              <textarea
                placeholder="Type your reply here..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              ></textarea>
              <button className="send-btn" onClick={handleReply}>
                Send Reply
              </button>
            </div>
          </div>
        ) : (
          <div className="enquiry-placeholder">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>Select an enquiry to view details</p>
          </div>
        )}
      </div>

      <style>{`
        .enquiry-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .enquiry-header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
        }

        .enquiry-header p {
          font-size: 14px;
          color: #6b7280;
          margin-top: 4px;
        }

        .enquiry-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .stat-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.blue { background: #dbeafe; color: #2563eb; }
        .stat-icon.orange { background: #fef3c7; color: #d97706; }
        .stat-icon.green { background: #dcfce7; color: #16a34a; }
        .stat-icon.red { background: #fee2e2; color: #dc2626; }

        .stat-number {
          display: block;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .stat-label {
          font-size: 13px;
          color: #6b7280;
        }

        .enquiry-filter {
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
        }

        .filter-btn.active {
          background: #111827;
          color: #ffffff;
          border-color: #111827;
        }

        .enquiry-container {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 24px;
          min-height: 500px;
        }

        .enquiry-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 600px;
          overflow-y: auto;
        }

        .enquiry-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 16px;
          border: 1px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.2s;
        }

        .enquiry-card:hover {
          border-color: #6366f1;
        }

        .enquiry-card.selected {
          border-color: #6366f1;
          background: #eef2ff;
        }

        .enquiry-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .enquiry-name {
          display: block;
          font-weight: 600;
          color: #111827;
          font-size: 14px;
        }

        .enquiry-email {
          font-size: 12px;
          color: #6b7280;
        }

        .priority-badge {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
        }

        .enquiry-subject {
          font-size: 14px;
          color: #374151;
          margin-bottom: 12px;
        }

        .enquiry-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .enquiry-date {
          font-size: 12px;
          color: #9ca3af;
        }

        .enquiry-detail {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e5e7eb;
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .detail-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .status-select {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
        }

        .detail-meta {
          display: flex;
          gap: 24px;
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .detail-message {
          background: #f9fafb;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .detail-message p {
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
        }

        .reply-section h4 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 12px;
        }

        .reply-section textarea {
          width: 100%;
          height: 120px;
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          resize: none;
          margin-bottom: 12px;
        }

        .reply-section textarea:focus {
          outline: none;
          border-color: #6366f1;
        }

        .send-btn {
          padding: 10px 24px;
          background: #111827;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .send-btn:hover {
          background: #1f2937;
        }

        .enquiry-placeholder {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
        }

        .enquiry-placeholder p {
          margin-top: 16px;
          font-size: 14px;
        }

        @media (max-width: 1024px) {
          .enquiry-container {
            grid-template-columns: 1fr;
          }
          
          .enquiry-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div >
  );
};

export default Enquiry;
