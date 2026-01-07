import { useEffect, useState } from 'react';
import StatsCard from '../../components/admin/StatsCard';
import InvoiceTable from '../../components/admin/InvoiceTable';
import TopProducts from '../../components/admin/TopProducts';
import { getStats, getRevenueData, getSalesByCategory } from '../../services/adminService';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [salesData, setSalesData] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all data on mount
        const fetchData = async () => {
            try {
                const [statsData, sales] = await Promise.all([
                    getStats(),
                    getSalesByCategory()
                ]);
                const revenue = getRevenueData(); // Still mock data

                setStats(statsData);
                setRevenueData(revenue);
                setSalesData(sales);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) return (
        <div className="dashboard-loading">
            <div className="spinner"></div>
            <p>Loading dashboard...</p>
        </div>
    );

    if (!stats) return (
        <div className="dashboard-loading">
            <p>No data available</p>
        </div>
    );

    // Calculate total sales for pie chart center
    const totalSales = salesData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="admin-dashboard-grid">
            {/* Main Content */}
            <div className="admin-dashboard-main">
                {/* Stats Cards */}
                <div className="admin-stats-row">
                    <StatsCard
                        title="Average Revenue"
                        value={stats.averageRevenue.value}
                        change={stats.averageRevenue.change}
                        previousValue={stats.averageRevenue.previousValue}
                        trend={stats.averageRevenue.trend}
                        miniChart={true}
                    />
                    <StatsCard
                        title="Customer Return"
                        value={stats.customerReturn.value}
                        change={stats.customerReturn.change}
                        previousValue={stats.customerReturn.previousValue}
                        trend={stats.customerReturn.trend}
                        miniChart={true}
                    />
                </div>

                {/* Revenue Chart */}
                <div className="admin-chart-card">
                    <div className="admin-chart-header">
                        <h3>Revenue vs Order</h3>
                        <div className="admin-chart-legend">
                            <span className="admin-legend-item">
                                <span className="admin-legend-dot" style={{ background: '#6366f1' }}></span>
                                Revenue
                            </span>
                            <span className="admin-legend-item">
                                <span className="admin-legend-dot" style={{ background: '#ef4444' }}></span>
                                Order
                            </span>
                        </div>
                    </div>
                    <div className="admin-line-chart">
                        <svg className="admin-line-chart-svg" viewBox="0 0 800 250" preserveAspectRatio="xMidYMid meet">
                            {/* Grid lines */}
                            <defs>
                                <pattern id="grid" width="66.67" height="50" patternUnits="userSpaceOnUse">
                                    <path d="M 66.67 0 L 0 0 0 50" fill="none" stroke="#f3f4f6" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />

                            {/* Y-axis labels */}
                            <text x="20" y="20" fill="#9ca3af" fontSize="12">1000</text>
                            <text x="20" y="70" fill="#9ca3af" fontSize="12">750</text>
                            <text x="20" y="120" fill="#9ca3af" fontSize="12">500</text>
                            <text x="20" y="170" fill="#9ca3af" fontSize="12">250</text>
                            <text x="20" y="220" fill="#9ca3af" fontSize="12">0</text>

                            {/* X-axis labels */}
                            {revenueData.map((item, index) => (
                                <text
                                    key={item.month}
                                    x={60 + (index * 60)}
                                    y="245"
                                    fill="#9ca3af"
                                    fontSize="11"
                                    textAnchor="middle"
                                >
                                    {item.month}
                                </text>
                            ))}

                            {/* Revenue Line (Blue) */}
                            <path
                                d={`M ${revenueData.map((item, index) =>
                                    `${60 + (index * 60)},${220 - (item.revenue / 1000 * 200)}`
                                ).join(' L ')}`}
                                fill="none"
                                stroke="#6366f1"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Order Line (Red) */}
                            <path
                                d={`M ${revenueData.map((item, index) =>
                                    `${60 + (index * 60)},${220 - (item.orders / 1000 * 200)}`
                                ).join(' L ')}`}
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Data points for Revenue */}
                            {revenueData.map((item, index) => (
                                <circle
                                    key={`rev-${index}`}
                                    cx={60 + (index * 60)}
                                    cy={220 - (item.revenue / 1000 * 200)}
                                    r="4"
                                    fill="#ffffff"
                                    stroke="#6366f1"
                                    strokeWidth="2"
                                />
                            ))}

                            {/* Data points for Orders */}
                            {revenueData.map((item, index) => (
                                <circle
                                    key={`ord-${index}`}
                                    cx={60 + (index * 60)}
                                    cy={220 - (item.orders / 1000 * 200)}
                                    r="4"
                                    fill="#ffffff"
                                    stroke="#ef4444"
                                    strokeWidth="2"
                                />
                            ))}
                        </svg>
                    </div>
                </div>

                {/* Invoice Table */}
                <InvoiceTable />
            </div>

            {/* Sidebar */}
            <div className="admin-dashboard-sidebar">
                {/* Sales by Category Pie Chart */}
                <div className="admin-pie-card">
                    <h3>Sales by Category</h3>
                    <div className="admin-pie-chart">
                        <svg viewBox="0 0 100 100">
                            {/* Pie chart segments */}
                            {salesData.map((item, index) => {
                                const startAngle = salesData
                                    .slice(0, index)
                                    .reduce((sum, i) => sum + (i.value / totalSales) * 360, 0);
                                const endAngle = startAngle + (item.value / totalSales) * 360;

                                const start = polarToCartesian(50, 50, 40, startAngle);
                                const end = polarToCartesian(50, 50, 40, endAngle);
                                const largeArc = endAngle - startAngle > 180 ? 1 : 0;

                                return (
                                    <path
                                        key={item.name}
                                        d={`M 50 50 L ${start.x} ${start.y} A 40 40 0 ${largeArc} 1 ${end.x} ${end.y} Z`}
                                        fill={item.color}
                                    />
                                );
                            })}
                            {/* Center hole for donut effect */}
                            <circle cx="50" cy="50" r="25" fill="white" />
                        </svg>
                        <div className="admin-pie-center">
                            <span>Total</span>
                            <strong>Sales</strong>
                        </div>
                    </div>
                    <div className="admin-pie-legend">
                        {salesData.map((item) => (
                            <span key={item.name} className="admin-pie-legend-item">
                                <span
                                    className="admin-pie-legend-dot"
                                    style={{ background: item.color }}
                                ></span>
                                {item.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <TopProducts />
            </div>
        </div>
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

export default Dashboard;
