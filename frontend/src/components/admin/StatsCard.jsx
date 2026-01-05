const StatsCard = ({ title, value, change, previousValue, trend, miniChart }) => {
    const formatCurrency = (num) => {
        return '$' + num.toLocaleString();
    };

    return (
        <div className="admin-stats-card">
            <h3>{title}</h3>
            <div className="admin-stats-content">
                <div>
                    <div className="admin-stats-value">
                        {typeof value === 'number' && title.toLowerCase().includes('revenue')
                            ? formatCurrency(value)
                            : value.toLocaleString()}
                    </div>
                    <div className="admin-stats-change">
                        <span className={`admin-stats-badge ${trend}`}>
                            {trend === 'up' ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                    <polyline points="17 6 23 6 23 12" />
                                </svg>
                            ) : (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                                    <polyline points="17 18 23 18 23 12" />
                                </svg>
                            )}
                            {change}%
                        </span>
                        <span className="admin-stats-prev">
                            {typeof previousValue === 'number' && title.toLowerCase().includes('revenue')
                                ? formatCurrency(previousValue)
                                : previousValue?.toLocaleString()}
                        </span>
                    </div>
                </div>
                {miniChart && (
                    <div className="admin-mini-chart">
                        <svg width="100" height="50" viewBox="0 0 100 50">
                            <defs>
                                <linearGradient id={`gradient-${trend}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor={trend === 'up' ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
                                    <stop offset="100%" stopColor={trend === 'up' ? '#10b981' : '#ef4444'} stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path
                                d={trend === 'up'
                                    ? "M0,40 Q10,35 20,30 T40,25 T60,15 T80,10 T100,5 L100,50 L0,50 Z"
                                    : "M0,10 Q10,15 20,20 T40,25 T60,35 T80,40 T100,45 L100,50 L0,50 Z"
                                }
                                fill={`url(#gradient-${trend})`}
                            />
                            <path
                                d={trend === 'up'
                                    ? "M0,40 Q10,35 20,30 T40,25 T60,15 T80,10 T100,5"
                                    : "M0,10 Q10,15 20,20 T40,25 T60,35 T80,40 T100,45"
                                }
                                fill="none"
                                stroke={trend === 'up' ? '#10b981' : '#ef4444'}
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsCard;
