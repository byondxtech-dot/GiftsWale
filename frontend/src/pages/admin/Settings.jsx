import { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'GiftsWale',
    siteEmail: 'admin@giftswale.com',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    notifications: {
      emailOrders: true,
      emailCustomers: true,
      pushNotifications: false,
      smsAlerts: false
    },
    shipping: {
      freeShippingThreshold: 500,
      standardRate: 50,
      expressRate: 100
    }
  });

  const handleSave = () => {
    console.log('💾 Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'shipping', label: 'Shipping', icon: '🚚' },
    { id: 'payments', label: 'Payments', icon: '💳' }
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your store preferences</p>
      </div>

      <div className="settings-container">
        {/* Sidebar Tabs */}
        <div className="settings-sidebar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                console.log('📑 Tab changed:', tab.id);
              }}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="settings-section">
              <h3>General Settings</h3>
              <div className="form-group">
                <label>Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Admin Email</label>
                <input
                  type="email"
                  value={settings.siteEmail}
                  onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h3>Notification Preferences</h3>
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <span className="toggle-label">Email for new orders</span>
                    <span className="toggle-desc">Receive email when a new order is placed</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailOrders}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, emailOrders: e.target.checked }
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <span className="toggle-label">Email for new customers</span>
                    <span className="toggle-desc">Receive email when a new customer registers</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailCustomers}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, emailCustomers: e.target.checked }
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <span className="toggle-label">Push notifications</span>
                    <span className="toggle-desc">Get push notifications on your browser</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.pushNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, pushNotifications: e.target.checked }
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <span className="toggle-label">SMS alerts</span>
                    <span className="toggle-desc">Receive SMS for important updates</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.smsAlerts}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, smsAlerts: e.target.checked }
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="settings-section">
              <h3>Shipping Settings</h3>
              <div className="form-group">
                <label>Free Shipping Threshold (₹)</label>
                <input
                  type="number"
                  value={settings.shipping.freeShippingThreshold}
                  onChange={(e) => setSettings({
                    ...settings,
                    shipping: { ...settings.shipping, freeShippingThreshold: e.target.value }
                  })}
                />
                <span className="form-hint">Orders above this amount get free shipping</span>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Standard Shipping Rate (₹)</label>
                  <input
                    type="number"
                    value={settings.shipping.standardRate}
                    onChange={(e) => setSettings({
                      ...settings,
                      shipping: { ...settings.shipping, standardRate: e.target.value }
                    })}
                  />
                </div>
                <div className="form-group">
                  <label>Express Shipping Rate (₹)</label>
                  <input
                    type="number"
                    value={settings.shipping.expressRate}
                    onChange={(e) => setSettings({
                      ...settings,
                      shipping: { ...settings.shipping, expressRate: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="settings-section">
              <h3>Payment Methods</h3>
              <div className="payment-methods">
                <div className="payment-card active">
                  <div className="payment-header">
                    <span className="payment-icon">💳</span>
                    <div className="payment-info">
                      <span className="payment-name">Razorpay</span>
                      <span className="payment-status">Connected</span>
                    </div>
                  </div>
                  <button className="payment-btn" onClick={() => console.log('📝 Configure Razorpay')}>Configure</button>
                </div>
                <div className="payment-card">
                  <div className="payment-header">
                    <span className="payment-icon">🏦</span>
                    <div className="payment-info">
                      <span className="payment-name">Bank Transfer</span>
                      <span className="payment-status inactive">Not configured</span>
                    </div>
                  </div>
                  <button className="payment-btn" onClick={() => console.log('📝 Configure Bank Transfer')}>Setup</button>
                </div>
                <div className="payment-card">
                  <div className="payment-header">
                    <span className="payment-icon">💵</span>
                    <div className="payment-info">
                      <span className="payment-name">Cash on Delivery</span>
                      <span className="payment-status">Enabled</span>
                    </div>
                  </div>
                  <button className="payment-btn" onClick={() => console.log('📝 Configure COD')}>Configure</button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="settings-footer">
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .settings-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .settings-header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
        }

        .settings-header p {
          font-size: 14px;
          color: #6b7280;
          margin-top: 4px;
        }

        .settings-container {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 24px;
        }

        .settings-sidebar {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          padding: 12px;
          height: fit-content;
        }

        .settings-tab {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          border: none;
          background: transparent;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .settings-tab:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .settings-tab.active {
          background: #111827;
          color: #ffffff;
        }

        .tab-icon {
          font-size: 18px;
        }

        .settings-content {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          padding: 24px;
        }

        .settings-section h3 {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #6366f1;
        }

        .form-hint {
          display: block;
          font-size: 12px;
          color: #9ca3af;
          margin-top: 6px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* Toggle Switches */
        .toggle-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .toggle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #f9fafb;
          border-radius: 12px;
        }

        .toggle-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .toggle-label {
          font-size: 14px;
          font-weight: 500;
          color: #111827;
        }

        .toggle-desc {
          font-size: 13px;
          color: #6b7280;
        }

        .toggle-switch {
          position: relative;
          width: 48px;
          height: 26px;
          cursor: pointer;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #e5e7eb;
          border-radius: 13px;
          transition: 0.3s;
        }

        .toggle-slider:before {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          left: 3px;
          bottom: 3px;
          background: #ffffff;
          border-radius: 50%;
          transition: 0.3s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .toggle-switch input:checked + .toggle-slider {
          background: #10b981;
        }

        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(22px);
        }

        /* Payment Methods */
        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .payment-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .payment-card.active {
          border-color: #10b981;
          background: #f0fdf4;
        }

        .payment-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .payment-icon {
          font-size: 28px;
        }

        .payment-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .payment-name {
          font-size: 15px;
          font-weight: 500;
          color: #111827;
        }

        .payment-status {
          font-size: 13px;
          color: #10b981;
        }

        .payment-status.inactive {
          color: #9ca3af;
        }

        .payment-btn {
          padding: 8px 16px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
        }

        .payment-btn:hover {
          background: #f3f4f6;
        }

        /* Save Button */
        .settings-footer {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: flex-end;
        }

        .save-btn {
          padding: 12px 24px;
          background: #111827;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .save-btn:hover {
          background: #1f2937;
        }

        @media (max-width: 768px) {
          .settings-container {
            grid-template-columns: 1fr;
          }

          .settings-sidebar {
            display: flex;
            overflow-x: auto;
            gap: 8px;
          }

          .settings-tab {
            white-space: nowrap;
          }
        }
      `}</style>
    </div >
  );
};

export default Settings;
