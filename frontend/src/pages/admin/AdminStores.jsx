import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Star, MapPin } from 'lucide-react';
import { stores } from '../../services/data';
import { useToast } from '../../context/ToastContext';

export default function AdminStores() {
  const [storeList, setStoreList] = useState([...stores]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', floor: 'Ground Floor', hours: '10:00 AM - 9:00 PM', description: '' });
  const { addToast } = useToast();

  const filtered = storeList.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleAdd = () => {
    if (!form.name || !form.category) { addToast('Please fill all fields', 'error'); return; }
    const newStore = { id: Date.now(), ...form, rating: 4.0, reviews: 0, isOpen: true, logo: '🏪', banner: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', offers: 0, productCount: 0 };
    setStoreList([...storeList, newStore]);
    setForm({ name: '', category: '', floor: 'Ground Floor', hours: '10:00 AM - 9:00 PM', description: '' });
    setShowAdd(false);
    addToast('Store added successfully', 'success');
  };

  const handleDelete = (id) => {
    setStoreList(storeList.filter(s => s.id !== id));
    addToast('Store deleted', 'info');
  };

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div><h1 className="admin-page-title">Manage Stores</h1><p className="admin-page-desc">{storeList.length} stores</p></div>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}><Plus size={16} /> Add Store</button>
      </div>

      {showAdd && (
        <div className="card-flat" style={{ padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Add New Store</h3>
          <div className="grid-3">
            <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Store name" /></div>
            <div className="form-group"><label className="form-label">Category</label><input className="form-input" value={form.category} onChange={e => update('category', e.target.value)} placeholder="Category" /></div>
            <div className="form-group"><label className="form-label">Floor</label>
              <select className="form-select" value={form.floor} onChange={e => update('floor', e.target.value)}>
                <option>Ground Floor</option><option>1st Floor</option><option>2nd Floor</option>
              </select>
            </div>
          </div>
          <div className="form-group"><label className="form-label">Hours</label><input className="form-input" value={form.hours} onChange={e => update('hours', e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" value={form.description} onChange={e => update('description', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" onClick={handleAdd}>Save Store</button>
            <button className="btn btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="search-bar" style={{ marginBottom: 24, maxWidth: 400 }}>
        <Search size={18} className="search-bar-icon" />
        <input placeholder="Search stores..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead><tr><th>Store</th><th>Category</th><th>Floor</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ fontSize: 20 }}>{s.logo}</span><span style={{ fontWeight: 600 }}>{s.name}</span></div></td>
                <td>{s.category}</td>
                <td><span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} /> {s.floor}</span></td>
                <td><span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star size={14} fill="#FBBF24" stroke="#FBBF24" /> {s.rating}</span></td>
                <td><span className={`badge ${s.isOpen ? 'badge-success' : 'badge-error'}`}>{s.isOpen ? 'Open' : 'Closed'}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-sm" title="Edit"><Edit2 size={14} /></button>
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }} onClick={() => handleDelete(s.id)} title="Delete"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
