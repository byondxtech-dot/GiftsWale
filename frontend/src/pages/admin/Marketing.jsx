import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const Marketing = () => {
    const [campaigns] = useState([
        { id: 1, name: 'New Year Sale', type: 'Email', status: 'Active', sent: 5420, clicks: 890 },
        { id: 2, name: 'Valentine Special', type: 'SMS', status: 'Scheduled', sent: 0, clicks: 0 },
        { id: 3, name: 'Flash Sale Alert', type: 'Push', status: 'Completed', sent: 8900, clicks: 2100 },
    ]);

    const [coupons] = useState([
        { id: 1, code: 'NEWYEAR25', discount: '25%', used: 67, limit: 100, status: 'Active' },
        { id: 2, code: 'FIRST10', discount: '10%', used: 234, limit: 500, status: 'Active' },
        { id: 3, code: 'FREESHIP', discount: 'Free Ship', used: 200, limit: 200, status: 'Expired' },
    ]);

    return (
        <AdminLayout>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Marketing</h2>

                {/* Campaigns */}
                <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Campaigns</h3>
                        <button onClick={() => console.log('➕ New Campaign')} style={{ padding: '8px 16px', background: '#111', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>+ New</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        {campaigns.map(c => (
                            <div key={c.id} onClick={() => console.log('📊 Campaign:', c)} style={{ padding: '16px', background: '#f9fafb', borderRadius: '12px', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                                    <span style={{ padding: '2px 8px', background: c.status === 'Active' ? '#dcfce7' : '#f3f4f6', color: c.status === 'Active' ? '#16a34a' : '#6b7280', borderRadius: '10px', fontSize: '12px' }}>{c.status}</span>
                                </div>
                                <span style={{ fontSize: '12px', color: '#6b7280' }}>{c.type} • {c.sent} sent • {c.clicks} clicks</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Coupons */}
                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Coupons</h3>
                        <button onClick={() => console.log('➕ Add Coupon')} style={{ padding: '8px 16px', background: '#111', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>+ Add</button>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f9fafb' }}>
                                <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '12px', color: '#6b7280' }}>CODE</th>
                                <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '12px', color: '#6b7280' }}>DISCOUNT</th>
                                <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '12px', color: '#6b7280' }}>USAGE</th>
                                <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '12px', color: '#6b7280' }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map(c => (
                                <tr key={c.id} onClick={() => console.log('🎫 Coupon:', c)} style={{ cursor: 'pointer', borderBottom: '1px solid #f3f4f6' }}>
                                    <td style={{ padding: '16px 24px' }}><code style={{ background: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, color: '#6366f1' }}>{c.code}</code></td>
                                    <td style={{ padding: '16px 24px', color: '#16a34a', fontWeight: 600 }}>{c.discount}</td>
                                    <td style={{ padding: '16px 24px' }}>{c.used}/{c.limit}</td>
                                    <td style={{ padding: '16px 24px' }}><span style={{ padding: '4px 10px', background: c.status === 'Active' ? '#dcfce7' : '#fee2e2', color: c.status === 'Active' ? '#16a34a' : '#dc2626', borderRadius: '10px', fontSize: '12px' }}>{c.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Marketing;
