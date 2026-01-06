import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../../styles/admin.css';

const AdminLayout = ({ children }) => {
    const [showMailDropdown, setShowMailDropdown] = useState(false);

    const messages = [
        { id: 1, name: 'Rahul Sharma', subject: 'Order not delivered', time: '5 min ago', unread: true },
        { id: 2, name: 'Priya Patel', subject: 'Product query', time: '1 hour ago', unread: true },
        { id: 3, name: 'Amit Kumar', subject: 'Refund request', time: '2 hours ago', unread: false },
        { id: 4, name: 'Sneha Gupta', subject: 'Bulk order inquiry', time: '1 day ago', unread: false },
    ];

    const unreadCount = messages.filter(m => m.unread).length;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short'
    });

    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div className="admin-header-left">
                        <h1>Welcome, Admin</h1>
                        <p>{formattedDate} | {formattedTime}</p>
                    </div>
                    <div className="admin-header-right">
                        {/* Notification Bell */}
                        <button className="admin-icon-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>

                        {/* Messages with Dropdown */}
                        <div className="dropdown-container">
                            <button
                                className="admin-icon-btn"
                                onClick={() => setShowMailDropdown(!showMailDropdown)}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                {unreadCount > 0 && (
                                    <span className="badge">{unreadCount}</span>
                                )}
                            </button>

                            {showMailDropdown && (
                                <>
                                    <div className="dropdown-overlay" onClick={() => setShowMailDropdown(false)}></div>
                                    <div className="mail-dropdown">
                                        <div className="dropdown-header">
                                            <h4>Messages</h4>
                                            <span className="unread-badge">{unreadCount} new</span>
                                        </div>
                                        <div className="dropdown-list">
                                            {messages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={`dropdown-item ${msg.unread ? 'unread' : ''}`}
                                                    onClick={() => {
                                                        console.log('📧 Message clicked:', msg);
                                                        setShowMailDropdown(false);
                                                    }}
                                                >
                                                    <div className="item-avatar">
                                                        {msg.name.charAt(0)}
                                                    </div>
                                                    <div className="item-content">
                                                        <span className="item-name">{msg.name}</span>
                                                        <span className="item-subject">{msg.subject}</span>
                                                    </div>
                                                    <span className="item-time">{msg.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <Link
                                            to="/admin/enquiry"
                                            className="dropdown-footer"
                                            onClick={() => setShowMailDropdown(false)}
                                        >
                                            View All Messages
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Search */}
                        <div className="admin-search">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input type="text" placeholder="Search" />
                        </div>
                    </div>
                </header>
                {children}
            </main>

            <style>{`
                .dropdown-container {
                    position: relative;
                }

                .admin-icon-btn {
                    position: relative;
                }

                .badge {
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    background: #ef4444;
                    color: white;
                    font-size: 10px;
                    font-weight: 600;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .dropdown-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 90;
                }

                .mail-dropdown {
                    position: absolute;
                    top: calc(100% + 12px);
                    right: 0;
                    width: 340px;
                    background: #ffffff;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                    border: 1px solid #e5e7eb;
                    z-index: 100;
                    overflow: hidden;
                    animation: slideDown 0.2s ease;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .dropdown-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 20px;
                    border-bottom: 1px solid #f3f4f6;
                }

                .dropdown-header h4 {
                    font-size: 15px;
                    font-weight: 600;
                    color: #111827;
                }

                .unread-badge {
                    background: #eef2ff;
                    color: #6366f1;
                    font-size: 12px;
                    font-weight: 500;
                    padding: 4px 10px;
                    border-radius: 20px;
                }

                .dropdown-list {
                    max-height: 300px;
                    overflow-y: auto;
                }

                .dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 20px;
                    cursor: pointer;
                    transition: background 0.2s;
                    border-bottom: 1px solid #f9fafb;
                }

                .dropdown-item:hover {
                    background: #f9fafb;
                }

                .dropdown-item.unread {
                    background: #f0f9ff;
                }

                .dropdown-item.unread:hover {
                    background: #e0f2fe;
                }

                .item-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 14px;
                    flex-shrink: 0;
                }

                .item-content {
                    flex: 1;
                    min-width: 0;
                }

                .item-name {
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    color: #111827;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .item-subject {
                    display: block;
                    font-size: 13px;
                    color: #6b7280;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .item-time {
                    font-size: 11px;
                    color: #9ca3af;
                    white-space: nowrap;
                }

                .dropdown-footer {
                    display: block;
                    text-align: center;
                    padding: 14px 20px;
                    background: #f9fafb;
                    color: #6366f1;
                    font-size: 14px;
                    font-weight: 500;
                    text-decoration: none;
                    transition: background 0.2s;
                }

                .dropdown-footer:hover {
                    background: #f3f4f6;
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;
