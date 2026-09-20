import { useState, useEffect } from 'react';
import { Users, Store, Package, ShoppingCart, DollarSign, Tag, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { stores, products, offers, parkingZones, formatPrice } from '../../services/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const COLORS = ['#7048F5', '#9B6CFF', '#20B486', '#F5A623', '#f5576c', '#4facfe', '#a18cd1', '#66a6ff'];

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('smartmall_orders') || '[]');
    setOrders(saved);
  }, []);

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const totalUsers = 156; // Demo
  
  const stats = [
    { label: 'Total Users', value: totalUsers, icon: <Users size={24} />, color: '#7048F5', bg: '#F0ECFF', trend: '+12%', up: true },
    { label: 'Stores', value: stores.length, icon: <Store size={24} />, color: '#20B486', bg: '#E6F9F1', trend: '+2', up: true },
    { label: 'Products', value: products.length, icon: <Package size={24} />, color: '#F5A623', bg: '#FFF6E6', trend: '+8', up: true },
    { label: 'Orders', value: orders.length, icon: <ShoppingCart size={24} />, color: '#4facfe', bg: '#EFF6FF', trend: `+${orders.length}`, up: true },
    { label: 'Revenue', value: formatPrice(totalRevenue), icon: <DollarSign size={24} />, color: '#20B486', bg: '#E6F9F1', trend: '+18%', up: true },
    { label: 'Active Offers', value: offers.length, icon: <Tag size={24} />, color: '#f5576c', bg: '#FEF2F2', trend: '3 new', up: true },
  ];

  // Chart data
  const categoryData = [
    { name: 'Electronics', products: 12, revenue: 45000 },
    { name: 'Fashion', products: 8, revenue: 28000 },
    { name: 'Sports', products: 8, revenue: 22000 },
    { name: 'Beauty', products: 3, revenue: 12000 },
    { name: 'F&B', products: 3, revenue: 8000 },
    { name: 'Accessories', products: 2, revenue: 6000 },
    { name: 'Home', products: 3, revenue: 9000 },
    { name: 'Books', products: 4, revenue: 5000 },
  ];

  const monthlyData = [
    { month: 'Apr', orders: 24, revenue: 45000 },
    { month: 'May', orders: 38, revenue: 67000 },
    { month: 'Jun', orders: 52, revenue: 89000 },
    { month: 'Jul', orders: 61, revenue: 112000 },
    { month: 'Aug', orders: 48, revenue: 95000 },
    { month: 'Sep', orders: 73, revenue: 134000 },
  ];

  const storePerformance = stores.map(s => ({
    name: s.name,
    rating: s.rating,
    reviews: s.reviews,
    products: products.filter(p => p.storeId === s.id).length
  }));

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-desc">Welcome to Smart Mall Admin Panel</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div>
              <div className="stat-card-label">{s.label}</div>
              <div className="stat-card-value" style={{ fontSize: s.label === 'Revenue' ? 22 : 28 }}>{s.value}</div>
              <div className="stat-card-trend up"><TrendingUp size={14} /> {s.trend}</div>
            </div>
            <div className="stat-card-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid-2" style={{ marginBottom: 32 }}>
        <div className="card-flat" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7048F5" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#7048F5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F7" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#7048F5" fill="url(#colorRevenue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card-flat" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Products by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F7" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="products" fill="#7048F5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid-2">
        <div className="card-flat" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Recent Orders</h3>
          {orders.length === 0 ? (
            <p style={{ fontSize: 13, color: '#9BA1BF', textAlign: 'center', padding: 24 }}>No orders yet</p>
          ) : (
            <div className="table-wrapper" style={{ boxShadow: 'none' }}>
              <table className="data-table">
                <thead><tr><th>Order ID</th><th>Status</th><th>Amount</th></tr></thead>
                <tbody>
                  {orders.slice(0, 5).map(o => (
                    <tr key={o.id}><td style={{ fontWeight: 600 }}>{o.id}</td><td><span className="badge badge-info">{o.status}</span></td><td>{formatPrice(o.total)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card-flat" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Store Performance</h3>
          <div className="table-wrapper" style={{ boxShadow: 'none' }}>
            <table className="data-table">
              <thead><tr><th>Store</th><th>Rating</th><th>Products</th></tr></thead>
              <tbody>
                {storePerformance.map(s => (
                  <tr key={s.name}><td style={{ fontWeight: 600 }}>{s.name}</td><td>⭐ {s.rating}</td><td>{s.products}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
