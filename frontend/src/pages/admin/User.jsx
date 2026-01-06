import { useState } from 'react';

const User = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Customer', status: 'Active', orders: 12, joined: '2025-10-15' },
        { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'Customer', status: 'Active', orders: 8, joined: '2025-11-20' },
        { id: 3, name: 'Admin User', email: 'admin@giftswale.com', role: 'Admin', status: 'Active', orders: 0, joined: '2025-01-01' },
        { id: 4, name: 'Amit Kumar', email: 'amit@example.com', role: 'Customer', status: 'Inactive', orders: 3, joined: '2025-09-05' },
    ]);

    const [search, setSearch] = useState('');

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id) => {
        setUsers(users.filter(u => u.id !== id));
        console.log('🗑️ User deleted:', id);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Users</h2>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>{users.length} total users</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '10px', width: '250px' }}
                    />
                    <button onClick={() => console.log('➕ Add User')} style={{ padding: '10px 20px', background: '#111', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>+ Add User</button>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                    <span style={{ fontSize: '28px', fontWeight: 700, color: '#111' }}>{users.length}</span>
                    <span style={{ display: 'block', fontSize: '13px', color: '#6b7280' }}>Total Users</span>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                    <span style={{ fontSize: '28px', fontWeight: 700, color: '#16a34a' }}>{users.filter(u => u.status === 'Active').length}</span>
                    <span style={{ display: 'block', fontSize: '13px', color: '#6b7280' }}>Active</span>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                    <span style={{ fontSize: '28px', fontWeight: 700, color: '#6366f1' }}>{users.filter(u => u.role === 'Admin').length}</span>
                    <span style={{ display: 'block', fontSize: '13px', color: '#6b7280' }}>Admins</span>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                    <span style={{ fontSize: '28px', fontWeight: 700, color: '#f59e0b' }}>{users.reduce((sum, u) => sum + u.orders, 0)}</span>
                    <span style={{ display: 'block', fontSize: '13px', color: '#6b7280' }}>Total Orders</span>
                </div>
            </div>

            {/* Table */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f9fafb' }}>
                            <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>User</th>
                            <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Role</th>
                            <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Orders</th>
                            <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Joined</th>
                            <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                            <th style={{ textAlign: 'left', padding: '14px 24px', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600 }}>{user.name.charAt(0)}</div>
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{user.name}</div>
                                            <div style={{ fontSize: '13px', color: '#6b7280' }}>{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '16px 24px' }}><span style={{ padding: '4px 10px', background: user.role === 'Admin' ? '#eef2ff' : '#f3f4f6', color: user.role === 'Admin' ? '#6366f1' : '#374151', borderRadius: '6px', fontSize: '12px' }}>{user.role}</span></td>
                                <td style={{ padding: '16px 24px', fontWeight: 500 }}>{user.orders}</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>{user.joined}</td>
                                <td style={{ padding: '16px 24px' }}><span style={{ padding: '4px 10px', background: user.status === 'Active' ? '#dcfce7' : '#fee2e2', color: user.status === 'Active' ? '#16a34a' : '#dc2626', borderRadius: '20px', fontSize: '12px' }}>{user.status}</span></td>
                                <td style={{ padding: '16px 24px' }}>
                                    <button onClick={() => console.log('✏️ Edit:', user)} style={{ padding: '6px 12px', background: '#eef2ff', color: '#6366f1', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '8px' }}>Edit</button>
                                    <button onClick={() => handleDelete(user.id)} style={{ padding: '6px 12px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;
