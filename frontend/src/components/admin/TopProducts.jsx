import { useState } from 'react';
import { getTopProducts, deleteProduct } from '../../services/adminService';

const TopProducts = () => {
    const [products] = useState(() => getTopProducts());
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log('🔍 Searching for:', searchTerm);
    };

    const handleProductClick = (product) => {
        console.log('📦 Product clicked:', product);
    };

    return (
        <div className="admin-products-card">
            <div className="admin-products-header">
                <h3>Top Products</h3>
                <div className="admin-products-search">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Enter</button>
                </div>
            </div>
            <div className="admin-products-list">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="admin-product-item"
                        onClick={() => handleProductClick(product)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="admin-product-img"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/48x48?text=Gift';
                            }}
                        />
                        <div className="admin-product-info">
                            <div className="admin-product-name">{product.name}</div>
                            <div className="admin-product-category">{product.category}</div>
                        </div>
                        <span className="admin-product-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                            </svg>
                            {product.percentage}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopProducts;
