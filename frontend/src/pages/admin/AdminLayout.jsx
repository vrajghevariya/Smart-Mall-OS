import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, Store, Package, ShoppingCart, Users, Tag, Car, BarChart2, Settings, Menu, X, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const sidebarLinks = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, exact: true },
  { to: '/admin/stores', label: 'Stores', icon: <Store size={18} /> },
  { to: '/admin/products', label: 'Products', icon: <Package size={18} /> },
  { to: '/admin/orders', label: 'Orders', icon: <ShoppingCart size={18} /> },
  { to: '/admin/users', label: 'Users', icon: <Users size={18} /> },
  { to: '/admin/inventory', label: 'Inventory AI', icon: <BarChart2 size={18} /> },
  { to: '/admin/offers', label: 'Offers', icon: <Tag size={18} /> },
  { to: '/admin/parking', label: 'Parking', icon: <Car size={18} /> },
];

export default function AdminLayout() {
  const { isAdmin, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated || !isAdmin) return (
    <div className="page-wrapper"><div className="container section"><div className="empty-state">
      <h3 className="empty-state-title">Admin Access Required</h3>
      <p className="empty-state-desc">Please login with an admin account to access this area.</p>
      <Link to="/login" className="btn btn-primary">Login as Admin</Link>
    </div></div></div>
  );

  const isActive = (link) => link.exact ? location.pathname === link.to : location.pathname.startsWith(link.to) && location.pathname !== '/admin';

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', marginBottom: 24 }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>⚡ Admin Panel</span>
            <button onClick={() => setSidebarOpen(false)} style={{ display: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }} className="admin-sidebar-close"><X size={20} /></button>
          </div>
          <div className="admin-sidebar-title">Navigation</div>
          {sidebarLinks.map(link => (
            <Link key={link.to} to={link.to} className={`admin-sidebar-link ${isActive(link) ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
        <div className="admin-sidebar-section" style={{ marginTop: 'auto' }}>
          <Link to="/" className="admin-sidebar-link"><ChevronLeft size={18} /> Back to Mall</Link>
        </div>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
