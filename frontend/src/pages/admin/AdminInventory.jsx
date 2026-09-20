import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { products, stores, categories } from '../../services/data';

const INVENTORY_DATA = categories.map(cat => {
  const catProducts = products.filter(p => p.category === cat.name);
  const totalStock = catProducts.reduce((s, p) => s + p.stock, 0);
  const lowStock = catProducts.filter(p => p.stock < 20).length;
  return { category: cat.name, icon: cat.icon, stock: totalStock, lowStock, products: catProducts.length, demand: Math.floor(Math.random() * 100) };
});

const WEEKLY_FORECAST = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
  day,
  predicted: Math.floor(Math.random() * 200) + 100,
  actual: Math.floor(Math.random() * 200) + 80,
}));

const STOCK_ALERTS = products.filter(p => p.stock < 20).slice(0, 6);

const COLORS = ['#7048F5', '#20B486', '#F5A623', '#EF4444', '#3B82F6', '#a18cd1', '#f5576c', '#4facfe'];

export default function AdminInventory() {
  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">📦 Inventory Prediction</h1>
        <p className="admin-page-desc">AI-powered stock forecasting and demand analysis</p>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        <div className="stat-card"><div><div className="stat-card-value">{products.reduce((s, p) => s + p.stock, 0)}</div><div className="stat-card-label">Total Stock Units</div></div><div className="stat-card-icon" style={{ background: 'var(--primary-subtle)', color: 'var(--accent)' }}><Package size={24} /></div></div>
        <div className="stat-card"><div><div className="stat-card-value" style={{ color: 'var(--error)' }}>{STOCK_ALERTS.length}</div><div className="stat-card-label">Low Stock Alerts</div></div><div className="stat-card-icon" style={{ background: 'var(--error-light)', color: 'var(--error)' }}><AlertTriangle size={24} /></div></div>
        <div className="stat-card"><div><div className="stat-card-value" style={{ color: 'var(--success)' }}>92%</div><div className="stat-card-label">Prediction Accuracy</div></div><div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><CheckCircle size={24} /></div></div>
        <div className="stat-card"><div><div className="stat-card-value">+15%</div><div className="stat-card-label">Demand Trend</div></div><div className="stat-card-icon" style={{ background: 'var(--info-light)', color: 'var(--info)' }}><TrendingUp size={24} /></div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Demand Forecast */}
        <div className="inventory-chart">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Weekly Demand Forecast</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={WEEKLY_FORECAST}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF0" />
              <XAxis dataKey="day" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="predicted" stroke="#7048F5" strokeWidth={2} dot={false} name="Predicted" />
              <Line type="monotone" dataKey="actual" stroke="#20B486" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stock by Category */}
        <div className="inventory-chart">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Stock Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={INVENTORY_DATA} dataKey="stock" nameKey="category" cx="50%" cy="50%" outerRadius={90} label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}>
                {INVENTORY_DATA.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inventory Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="inventory-chart">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Category Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={INVENTORY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF0" />
              <XAxis dataKey="category" fontSize={10} angle={-20} textAnchor="end" height={60} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="stock" fill="#7048F5" radius={[6, 6, 0, 0]} name="Stock" />
              <Bar dataKey="demand" fill="#20B486" radius={[6, 6, 0, 0]} name="Demand Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="inventory-chart">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>⚠️ Low Stock Alerts</h3>
          {STOCK_ALERTS.length === 0 ? (
            <p style={{ color: 'var(--text-tertiary)', textAlign: 'center', padding: 40 }}>All products are well-stocked!</p>
          ) : (
            STOCK_ALERTS.map(p => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--bg-hover)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{p.store} • {p.category}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${p.stock < 10 ? 'badge-error' : 'badge-warning'}`}>{p.stock} left</span>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Reorder suggested</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
