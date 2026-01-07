import { useState, useEffect, useRef } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/adminService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ show: false, product: null });
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    comparePrice: '',
    stock: '',
    brand: '',
    sku: '',
    status: 'Active',
    isFeatured: false,
    tags: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesStatus = !statusFilter || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setStatusFilter('');
  };

  const hasActiveFilters = searchTerm || categoryFilter || statusFilter;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imagePreviews.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    setSelectedFiles(prev => [...prev, ...files]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, { url: reader.result, isNew: true, file }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      const previewsBeforeIndex = imagePreviews.slice(0, index).filter(p => p.isNew).length;
      if (imagePreviews[index]?.isNew) {
        newFiles.splice(previewsBeforeIndex, 1);
      }
      return newFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      if (formData.comparePrice) formDataToSend.append('comparePrice', formData.comparePrice);
      formDataToSend.append('stock', formData.stock);
      if (formData.brand) formDataToSend.append('brand', formData.brand);
      if (formData.sku) formDataToSend.append('sku', formData.sku);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('isFeatured', formData.isFeatured);
      if (formData.tags) formDataToSend.append('tags', formData.tags);

      // Append new image files
      selectedFiles.forEach(file => {
        formDataToSend.append('images', file);
      });

      // For edit mode, include existing images that weren't removed
      if (editingProduct) {
        const existingImages = imagePreviews
          .filter(img => !img.isNew && img.publicId)
          .map(img => ({ url: img.url, publicId: img.publicId }));
        formDataToSend.append('existingImages', JSON.stringify(existingImages));

        const result = await updateProduct(editingProduct._id, formDataToSend);
        if (result.success) {
          setProducts(products.map(p => p._id === editingProduct._id ? result.product : p));
        }
      } else {
        const result = await createProduct(formDataToSend);
        if (result.success) {
          setProducts([result.product, ...products]);
        }
      }

      closeModal();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }

    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (!deleteModal.product) return;
    setDeleting(true);

    try {
      const result = await deleteProduct(deleteModal.product._id);
      if (result.success) {
        setProducts(products.filter(p => p._id !== deleteModal.product._id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }

    setDeleting(false);
    setDeleteModal({ show: false, product: null });
  };

  const openDeleteModal = (product) => {
    setDeleteModal({ show: true, product });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, product: null });
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      category: product.category || '',
      price: product.price || '',
      comparePrice: product.comparePrice || '',
      stock: product.stock || '',
      brand: product.brand || '',
      sku: product.sku || '',
      status: product.status || 'Active',
      isFeatured: product.isFeatured || false,
      tags: product.tags?.join(', ') || ''
    });
    setImagePreviews(product.images?.map(img => ({ ...img, isNew: false })) || []);
    setSelectedFiles([]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      comparePrice: '',
      stock: '',
      brand: '',
      sku: '',
      status: 'Active',
      isFeatured: false,
      tags: ''
    });
    setImagePreviews([]);
    setSelectedFiles([]);
  };

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <div>
          <h2>Products</h2>
          <p>{products.length} total products</p>
        </div>
        <div className="products-actions">
          <div className="products-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Kids">Kids</option>
            <option value="Home">Home</option>
            <option value="Accessories">Accessories</option>
            <option value="Electronics">Electronics</option>
            <option value="Beauty">Beauty</option>
            <option value="Sports">Sports</option>
          </select>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Draft">Draft</option>
          </select>
          {hasActiveFilters && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Clear
            </button>
          )}
          <button className="add-product-btn" onClick={() => setShowModal(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="products-table-card">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <h3>No products yet</h3>
            <p>Add your first product to get started</p>
          </div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="product-cell">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="product-img"
                        />
                      ) : (
                        <div className="product-img-placeholder">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      )}
                      <div className="product-info">
                        <span className="product-name">{product.name}</span>
                        {product.brand && <span className="product-brand">{product.brand}</span>}
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <div className="price-cell">
                      <span className="current-price">₹{product.price}</span>
                      {product.comparePrice && (
                        <span className="compare-price">₹{product.comparePrice}</span>
                      )}
                    </div>
                  </td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`status-badge ${product.status?.toLowerCase().replace(' ', '-')}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" onClick={() => openEditModal(product)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button className="action-btn delete" onClick={() => openDeleteModal(product)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content product-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="modal-close" onClick={closeModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              {/* Image Upload Section */}
              <div className="form-section">
                <label className="section-label">Product Images</label>
                <div className="image-upload-area">
                  <div className="image-previews">
                    {imagePreviews.map((img, index) => (
                      <div key={index} className="image-preview-item">
                        <img src={img.url} alt={`Preview ${index + 1}`} />
                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={() => removeImage(index)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {imagePreviews.length < 5 && (
                      <div
                        className="add-image-btn"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Add Image</span>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  <p className="image-hint">Upload up to 5 images. First image will be the main image.</p>
                </div>
              </div>

              {/* Basic Info */}
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Kids">Kids</option>
                    <option value="Home">Home</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Brand name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Compare Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.comparePrice}
                    onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
                    placeholder="Original price"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="SKU-001"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tags</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="gift, birthday, premium"
                  />
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  <span>Featured Product</span>
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="btn-spinner"></span>
                      {editingProduct ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingProduct ? 'Update Product' : 'Add Product'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h3>Delete Product</h3>
            <p>Are you sure you want to delete <strong>"{deleteModal.product?.name}"</strong>? This action cannot be undone.</p>
            <div className="delete-modal-actions">
              <button className="btn-cancel" onClick={closeDeleteModal}>Cancel</button>
              <button className="btn-delete" onClick={handleDelete} disabled={deleting}>
                {deleting ? (
                  <>
                    <span className="btn-spinner"></span>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .products-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .products-header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
        }

        .products-header p {
          font-size: 14px;
          color: #6b7280;
          margin-top: 4px;
        }

        .products-actions {
          display: flex;
          gap: 12px;
        }

        .products-search {
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 10px 16px;
          min-width: 250px;
        }

        .products-search input {
          border: none;
          outline: none;
          margin-left: 8px;
          font-size: 14px;
          width: 100%;
          background: transparent;
        }

        .add-product-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #111827;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .add-product-btn:hover {
          background: #1f2937;
        }

        .filter-select {
          padding: 10px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          background: #ffffff;
          color: #374151;
          cursor: pointer;
          min-width: 140px;
        }

        .filter-select:focus {
          outline: none;
          border-color: #6366f1;
        }

        .clear-filters-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: #fef2f2;
          color: #ef4444;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .clear-filters-btn:hover {
          background: #fee2e2;
        }

        .products-table-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          min-height: 300px;
        }

        .loading-state,
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .empty-state h3 {
          margin-top: 16px;
          font-size: 16px;
          color: #374151;
        }

        .empty-state p {
          margin-top: 4px;
          font-size: 14px;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #e5e7eb;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .products-table {
          width: 100%;
          border-collapse: collapse;
        }

        .products-table th {
          text-align: left;
          padding: 16px 24px;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }

        .products-table td {
          padding: 16px 24px;
          font-size: 14px;
          color: #374151;
          border-bottom: 1px solid #f3f4f6;
        }

        .products-table tr:hover {
          background: #f9fafb;
        }

        .product-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .product-img {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          object-fit: cover;
        }

        .product-img-placeholder {
          width: 48px;
          height: 48px;
          background: #f3f4f6;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-info {
          display: flex;
          flex-direction: column;
        }

        .product-name {
          font-weight: 500;
          color: #111827;
        }

        .product-brand {
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
        }

        .price-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .current-price {
          font-weight: 500;
          color: #111827;
        }

        .compare-price {
          font-size: 12px;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-badge.active {
          background: #dcfce7;
          color: #16a34a;
        }

        .status-badge.draft {
          background: #f3f4f6;
          color: #6b7280;
        }

        .status-badge.low-stock {
          background: #fef3c7;
          color: #d97706;
        }

        .status-badge.out-of-stock {
          background: #fee2e2;
          color: #dc2626;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .action-btn.edit {
          background: #eef2ff;
          color: #6366f1;
        }

        .action-btn.edit:hover {
          background: #e0e7ff;
        }

        .action-btn.delete {
          background: #fef2f2;
          color: #ef4444;
        }

        .action-btn.delete:hover {
          background: #fee2e2;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
        }

        .modal-content.product-modal {
          background: #ffffff;
          border-radius: 16px;
          width: 100%;
          max-width: 640px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 10;
        }

        .modal-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 4px;
        }

        .product-form {
          padding: 24px;
        }

        .form-section {
          margin-bottom: 24px;
        }

        .section-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 12px;
        }

        .image-upload-area {
          background: #f9fafb;
          border: 2px dashed #e5e7eb;
          border-radius: 12px;
          padding: 16px;
        }

        .image-previews {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .image-preview-item {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
        }

        .image-preview-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remove-image-btn {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 20px;
          height: 20px;
          background: rgba(0, 0, 0, 0.6);
          border: none;
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .add-image-btn {
          width: 80px;
          height: 80px;
          border: 2px dashed #d1d5db;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .add-image-btn:hover {
          border-color: #6366f1;
          background: #eef2ff;
        }

        .add-image-btn span {
          font-size: 10px;
          color: #6b7280;
        }

        .image-hint {
          margin-top: 12px;
          font-size: 12px;
          color: #9ca3af;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          transition: border-color 0.2s;
          font-family: inherit;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #6366f1;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .checkbox-group {
          margin-top: 8px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 400 !important;
        }

        .checkbox-label input {
          width: 18px;
          height: 18px;
          accent-color: #6366f1;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .btn-cancel {
          padding: 10px 20px;
          background: #f3f4f6;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
        }

        .btn-submit {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #111827;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .btn-submit:hover:not(:disabled) {
          background: #1f2937;
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        /* Delete Modal Styles */
        .delete-modal {
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .delete-modal-icon {
          margin-bottom: 16px;
        }

        .delete-modal h3 {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 8px;
        }

        .delete-modal p {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .delete-modal p strong {
          color: #374151;
        }

        .delete-modal-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .btn-delete {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: #ef4444;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-delete:hover:not(:disabled) {
          background: #dc2626;
        }

        .btn-delete:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Products;
