import { useEffect, useState } from 'react';
import { getRevenueData, getSalesByCategory, getStats } from '../../services/adminService';

const Analytics = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  useEffect(() => {
    const revenue = getRevenueData();
    const sales = getSalesByCategory();
    const statsData = getStats();

    setRevenueData(revenue);
    setSalesData(sales);
    setStats(statsData);

    console.log('📊 Analytics Page Loaded');
  }, []);

  if (!stats) return <div>Loading...</div>;

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  return (
    <div className="analytics-container">
      {/* Period Selector */}
      <div className="analytics-header">
        <h2>Analytics Overview</h2>
        <div className="period-selector">
          {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
            <button
              key={period}
              className={`period-btn ${selectedPeriod === period ? 'active' : ''}`}
              onClick={() => {
                setSelectedPeriod(period);
                console.log('📅 Period changed to:', period);
              }}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="analytics-stats-grid">
        <div className="analytics-stat-card">
          <div className="stat-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value">${totalRevenue.toLocaleString()}</span>
            <span className="stat-change positive">+12.5% from last {selectedPeriod.slice(0, -2)}</span>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="stat-icon green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">{totalOrders.toLocaleString()}</span>
            <span className="stat-change positive">+8.2% from last {selectedPeriod.slice(0, -2)}</span>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="stat-icon purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">New Customers</span>
            <span className="stat-value">1,247</span>
            <span className="stat-change positive">+15.3% from last {selectedPeriod.slice(0, -2)}</span>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="stat-icon orange">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Avg. Order Value</span>
            <span className="stat-value">${avgOrderValue}</span>
            <span className="stat-change negative">-2.1% from last {selectedPeriod.slice(0, -2)}</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="analytics-charts-row">
        {/* Revenue Trend Chart */}
        <div className="analytics-chart-card large">
          <div className="chart-header">
            <h3>Revenue Trend</h3>
            <div className="chart-actions">
              <button className="chart-action-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export
              </button>
            </div>
          </div>
          <div className="chart-container">
            <svg viewBox="0 0 800 300" className="revenue-chart">
              {/* Background grid */}
              <defs>
                <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Y-axis labels */}
              {[0, 250, 500, 750, 1000].reverse().map((val, i) => (
                <text key={val} x="30" y={40 + i * 55} fill="#9ca3af" fontSize="11">{val}</text>
              ))}

              {/* Area fill */}
              <path
                d={`M 60,${260 - (revenueData[0]?.revenue / 1000 * 220)} 
                      ${revenueData.map((item, index) =>
                  `L ${60 + (index * 62)},${260 - (item.revenue / 1000 * 220)}`
                ).join(' ')} 
                      L ${60 + ((revenueData.length - 1) * 62)},260 
                      L 60,260 Z`}
                fill="url(#revenueGradient)"
              />

              {/* Line */}
              <path
                d={`M ${revenueData.map((item, index) =>
                  `${60 + (index * 62)},${260 - (item.revenue / 1000 * 220)}`
                ).join(' L ')}`}
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {revenueData.map((item, index) => (
                <g key={index}>
                  <circle
                    cx={60 + (index * 62)}
                    cy={260 - (item.revenue / 1000 * 220)}
                    r="6"
                    fill="#ffffff"
                    stroke="#6366f1"
                    strokeWidth="3"
                  />
                  <text
                    x={60 + (index * 62)}
                    y="285"
                    fill="#9ca3af"
                    fontSize="11"
                    textAnchor="middle"
                  >
                    {item.month}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="analytics-chart-card">
          <div className="chart-header">
            <h3>Sales Distribution</h3>
          </div>
          <div className="donut-chart-container">
            <svg viewBox="0 0 200 200" className="donut-chart">
              {salesData.map((item, index) => {
                const total = salesData.reduce((sum, i) => sum + i.value, 0);
                const startAngle = salesData
                  .slice(0, index)
                  .reduce((sum, i) => sum + (i.value / total) * 360, 0);
                const endAngle = startAngle + (item.value / total) * 360;

                const start = polarToCartesian(100, 100, 70, startAngle);
                const end = polarToCartesian(100, 100, 70, endAngle);
                const largeArc = endAngle - startAngle > 180 ? 1 : 0;

                return (
                  <path
                    key={item.name}
                    d={`M 100 100 L ${start.x} ${start.y} A 70 70 0 ${largeArc} 1 ${end.x} ${end.y} Z`}
                    fill={item.color}
                    className="donut-segment"
                    onClick={() => console.log('📊 Category clicked:', item)}
                  />
                );
              })}
              <circle cx="100" cy="100" r="45" fill="white" />
              <text x="100" y="95" textAnchor="middle" fill="#111827" fontSize="24" fontWeight="bold">
                {salesData.reduce((sum, i) => sum + i.value, 0)}%
              </text>
              <text x="100" y="115" textAnchor="middle" fill="#9ca3af" fontSize="12">
                Total Sales
              </text>
            </svg>
          </div>
          <div className="category-legend">
            {salesData.map((item) => (
              <div key={item.name} className="legend-item">
                <span className="legend-dot" style={{ background: item.color }}></span>
                <span className="legend-label">{item.name}</span>
                <span className="legend-value">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="analytics-bottom-row">
        {/* Traffic Sources */}
        <div className="analytics-card">
          <h3>Traffic Sources</h3>
          <div className="traffic-list">
            {[
              { source: 'Direct', visits: 5234, percentage: 40, color: '#6366f1' },
              { source: 'Organic Search', visits: 3421, percentage: 26, color: '#10b981' },
              { source: 'Social Media', visits: 2156, percentage: 16, color: '#f59e0b' },
              { source: 'Referral', visits: 1543, percentage: 12, color: '#ef4444' },
              { source: 'Email', visits: 876, percentage: 6, color: '#8b5cf6' }
            ].map((item) => (
              <div key={item.source} className="traffic-item" onClick={() => console.log('🔗 Traffic source:', item)}>
                <div className="traffic-info">
                  <span className="traffic-source">{item.source}</span>
                  <span className="traffic-visits">{item.visits.toLocaleString()} visits</span>
                </div>
                <div className="traffic-bar-container">
                  <div
                    className="traffic-bar"
                    style={{ width: `${item.percentage}%`, background: item.color }}
                  ></div>
                </div>
                <span className="traffic-percentage">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="analytics-card">
          <h3>Top Pages</h3>
          <div className="pages-list">
            {[
              { page: '/products/gifts', views: 12453, bounce: '32%' },
              { page: '/categories/birthday', views: 8921, bounce: '28%' },
              { page: '/checkout', views: 6734, bounce: '15%' },
              { page: '/products/personalized', views: 5621, bounce: '35%' },
              { page: '/cart', views: 4532, bounce: '42%' }
            ].map((item, index) => (
              <div key={item.page} className="page-item" onClick={() => console.log('📄 Page clicked:', item)}>
                <span className="page-rank">{index + 1}</span>
                <div className="page-info">
                  <span className="page-url">{item.page}</span>
                  <span className="page-stats">{item.views.toLocaleString()} views • {item.bounce} bounce</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .analytics-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .analytics-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .analytics-header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
        }

        .period-selector {
          display: flex;
          gap: 8px;
          background: #f3f4f6;
          padding: 4px;
          border-radius: 10px;
        }

        .period-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }

        .period-btn.active {
          background: #ffffff;
          color: #111827;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .analytics-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .analytics-stat-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.blue { background: #eef2ff; color: #6366f1; }
        .stat-icon.green { background: #ecfdf5; color: #10b981; }
        .stat-icon.purple { background: #f5f3ff; color: #8b5cf6; }
        .stat-icon.orange { background: #fff7ed; color: #f59e0b; }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 13px;
          color: #6b7280;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin: 4px 0;
        }

        .stat-change {
          font-size: 12px;
          font-weight: 500;
        }

        .stat-change.positive { color: #10b981; }
        .stat-change.negative { color: #ef4444; }

        .analytics-charts-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .analytics-chart-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e5e7eb;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .chart-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .chart-action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: #f3f4f6;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          color: #374151;
          cursor: pointer;
        }

        .chart-container {
          height: 300px;
        }

        .revenue-chart {
          width: 100%;
          height: 100%;
        }

        .donut-chart-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .donut-chart {
          width: 180px;
          height: 180px;
        }

        .donut-segment {
          cursor: pointer;
          transition: transform 0.2s;
        }

        .donut-segment:hover {
          opacity: 0.8;
        }

        .category-legend {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .legend-label {
          flex: 1;
          font-size: 13px;
          color: #374151;
        }

        .legend-value {
          font-size: 13px;
          font-weight: 600;
          color: #111827;
        }

        .analytics-bottom-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .analytics-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e5e7eb;
        }

        .analytics-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 20px;
        }

        .traffic-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .traffic-item {
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
        }

        .traffic-info {
          width: 140px;
        }

        .traffic-source {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #111827;
        }

        .traffic-visits {
          font-size: 12px;
          color: #9ca3af;
        }

        .traffic-bar-container {
          flex: 1;
          height: 8px;
          background: #f3f4f6;
          border-radius: 4px;
          overflow: hidden;
        }

        .traffic-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s;
        }

        .traffic-percentage {
          width: 40px;
          text-align: right;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }

        .pages-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .page-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f9fafb;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .page-item:hover {
          background: #f3f4f6;
        }

        .page-rank {
          width: 28px;
          height: 28px;
          background: #111827;
          color: #ffffff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }

        .page-info {
          flex: 1;
        }

        .page-url {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #111827;
        }

        .page-stats {
          font-size: 12px;
          color: #9ca3af;
        }

        @media (max-width: 1280px) {
          .analytics-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .analytics-charts-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .analytics-stats-grid {
            grid-template-columns: 1fr;
          }
          
          .analytics-bottom-row {
            grid-template-columns: 1fr;
          }
          
          .analytics-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div >
  );
};

// Helper function for pie chart
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

export default Analytics;
