import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Star } from 'lucide-react';
import { products, stores, categories, formatPrice } from '../../services/data';
import { useToast } from '../../context/ToastContext';

export default function AdminProducts() {
  const [productList, setProductList] = useState([...products]);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', originalPrice: '', category: '', storeId: '', description: '', stock: '' });
  const { addToast } = useToast();

  const filtered = productList.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleAdd = () => {
    if (!form.name || !form.price) { addToast('Please fill required fields', 'error'); return; }
    const store = stores.find(s => s.id === Number(form.storeId)) || stores[0];
    const newProduct = { id: Date.now(), name: form.name, price: Number(form.price), originalPrice: Number(form.originalPrice || form.price), discount: form.originalPrice ? Math.round((1 - form.price / form.originalPrice) * 100) : 0, category: form.category || 'Electronics', storeId: store.id, store: store.name, rating: 4.0, reviews: 0, stock: Number(form.stock || 50), description: form.description, tags: [], image: '' };
    setProductList([...productList, newProduct]);
    setForm({ name: '', price: '', originalPrice: '', category: '', storeId: '', description: '', stock: '' });
    setShowAdd(false);
    addToast('Product added', 'success');
  };

  const handleDelete = (id) => { setProductList(productList.filter(p => p.id !== id)); addToast('Product deleted', 'info'); };

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div><h1 className="admin-page-title">Manage Products</h1><p className="admin-page-desc">{productList.length} products</p></div>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}><Plus size={16} /> Add Product</button>
      </div>

      {showAdd && (
        <div className="card-flat" style={{ padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Add New Product</h3>
          <div className="grid-3">
            <div className="form-group"><label className="form-label">Name *</label><input className="form-input" value={form.name} onChange={e => update('name', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Price *</label><input type="number" className="form-input" value={form.price} onChange={e => update('price', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Original Price</label><input type="number" className="form-input" value={form.originalPrice} onChange={e => update('originalPrice', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Category</label>
              <select className="form-select" value={form.category} onChange={e => update('category', e.target.value)}>
                <option value="">Select</option>
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group"><label className="form-label">Store</label>
              <select className="form-select" value={form.storeId} onChange={e => update('storeId', e.target.value)}>
                <option value="">Select</option>
                {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="form-group"><label className="form-label">Stock</label><input type="number" className="form-input" value={form.stock} onChange={e => update('stock', e.target.value)} /></div>
          </div>
          <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" value={form.description} onChange={e => update('description', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: 8 }}><button className="btn btn-primary" onClick={handleAdd}>Save</button><button className="btn btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button></div>
        </div>
      )}

      <div className="search-bar" style={{ marginBottom: 24, maxWidth: 400 }}>
        <Search size={18} className="search-bar-icon" /><input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead><tr><th>Product</th><th>Category</th><th>Store</th><th>Price</th><th>Stock</th><th>Rating</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.slice(0, 20).map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td><span className="badge badge-primary">{p.category}</span></td>
                <td>{p.store}</td>
                <td>
                  <div>{formatPrice(p.price)}</div>
                  {p.discount > 0 && <div style={{ fontSize: 11, color: 'var(--success)' }}>-{p.discount}%</div>}
                </td>
                <td><span style={{ color: p.stock < 30 ? 'var(--warning)' : 'var(--success)', fontWeight: 600 }}>{p.stock}</span></td>
                <td><Star size={12} fill="#FBBF24" stroke="#FBBF24" /> {p.rating}</td>
                <td><div style={{ display: 'flex', gap: 4 }}>
                  <button className="btn btn-ghost btn-sm"><Edit2 size={14} /></button>
                  <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }} onClick={() => handleDelete(p.id)}><Trash2 size={14} /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 20 && <p style={{ textAlign: 'center', padding: 12, fontSize: 12, color: '#9BA1BF' }}>Showing 20 of {filtered.length}</p>}
      </div>
    </div>
  );
}
