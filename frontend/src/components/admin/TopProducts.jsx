import { useState, useEffect } from 'react';
import { getTopProducts } from '../../services/adminService';

const TopProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getTopProducts();
                setProducts(data || []);
            } catch (error) {
                console.error('Error fetching top products:', error);
                setProducts([]);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const handleSearch = () => {
        console.log('🔍 Searching for:', searchTerm);
    };

    const handleProductClick = (product) => {
        console.log('📦 Product clicked:', product);
    };

    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                {loading ? (
                    <div className="loading-text">Loading...</div>
                ) : filteredProducts.length === 0 ? (
                    <div className="empty-text">No products found</div>
                ) : (
                    filteredProducts.map((product) => (
                        <div
                            key={product._id || product.id}
                            className="admin-product-item"
                            onClick={() => handleProductClick(product)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={product.images?.[0]?.url || product.image || 'https://via.placeholder.com/48x48?text=Gift'}
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
                                ₹{product.price}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TopProducts;

