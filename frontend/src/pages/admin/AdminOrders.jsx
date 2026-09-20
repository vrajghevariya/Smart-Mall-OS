import { useState, useEffect } from 'react';
import { Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { formatPrice } from '../../services/data';
import { useToast } from '../../context/ToastContext';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('smartmall_orders') || '[]');
    setOrders(saved.reverse());
  }, []);

  const statusColors = { PLACED: 'badge-info', CONFIRMED: 'badge-primary', PREPARING: 'badge-warning', READY: 'badge-success', COMPLETED: 'badge-success', CANCELLED: 'badge-error' };
  const filtered = orders.filter(o => o.id.toLowerCase().includes(search.toLowerCase()));

  const updateStatus = (orderId, newStatus) => {
    const all = JSON.parse(localStorage.getItem('smartmall_orders') || '[]');
    const idx = all.findIndex(o => o.id === orderId);
    if (idx >= 0) {
      all[idx].status = newStatus;
      all[idx].timeline = [...(all[idx].timeline || []), { status: newStatus, time: new Date().toISOString() }];
      localStorage.setItem('smartmall_orders', JSON.stringify(all));
      setOrders([...all].reverse());
      addToast(`Order ${orderId} → ${newStatus}`, 'success');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Manage Orders</h1>
        <p className="admin-page-desc">{orders.length} total orders</p>
      </div>

      <div className="search-bar" style={{ marginBottom: 24, maxWidth: 400 }}>
        <Search size={18} className="search-bar-icon" /><input placeholder="Search by order ID..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state"><h3 className="empty-state-title">No orders</h3><p className="empty-state-desc">Orders will appear here when customers checkout.</p></div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead><tr><th>Order ID</th><th>Date</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td style={{ fontWeight: 600 }}>{o.id}</td>
                  <td style={{ fontSize: 13 }}>{new Date(o.date).toLocaleDateString()}</td>
                  <td>{o.items.length} items</td>
                  <td style={{ fontWeight: 600 }}>{formatPrice(o.total)}</td>
                  <td style={{ textTransform: 'uppercase', fontSize: 12 }}>{o.payment}</td>
                  <td><span className={`badge ${statusColors[o.status]}`}>{o.status}</span></td>
                  <td>
                    <select className="form-select" style={{ width: 'auto', fontSize: 12, padding: '4px 28px 4px 8px' }} value={o.status} onChange={e => updateStatus(o.id, e.target.value)}>
                      {['PLACED', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
