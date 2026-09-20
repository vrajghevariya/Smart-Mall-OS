import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, Store, MapPin, Car, MessageSquare, LayoutDashboard, LogOut, Sun, Moon, Home, Compass, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { darkMode, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setProfileOpen(false); }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/stores', label: 'Stores' },
    { to: '/products', label: 'Explore' },
    { to: '/mall-map', label: 'Mall Map' },
    { to: '/offers', label: 'Offers' },
    { to: '/price-compare', label: 'Price Tracker' },
  ];

  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleLogout = () => { logout(); setProfileOpen(false); navigate('/'); };

  return (
    <>
      {/* Desktop navbar */}
      <nav className={`glass-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            <div className="navbar-brand-icon">✦</div>
            <span>Smart Mall</span>
          </Link>

          <div className="navbar-nav">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className={`navbar-link ${isActive(link.to) ? 'active' : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            <button className="theme-toggle" onClick={toggleTheme} title={darkMode ? 'Light mode' : 'Dark mode'} aria-label="Toggle theme">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/products" className="navbar-icon-btn" title="Search" aria-label="Search products">
              <Search size={19} />
            </Link>
            <Link to="/wishlist" className="navbar-icon-btn" title="Wishlist" aria-label="Wishlist">
              <Heart size={19} />
              {wishlistItems.length > 0 && <span className="badge-count">{wishlistItems.length}</span>}
            </Link>
            <Link to="/cart" className="navbar-icon-btn" title="Cart" aria-label="Cart">
              <ShoppingCart size={19} />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </Link>

            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button className="navbar-avatar" onClick={() => setProfileOpen(!profileOpen)} aria-label="Profile menu">
                  {user.name.charAt(0)}
                </button>
                {profileOpen && (
                  <div className="navbar-dropdown-menu">
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--bg-hover)' }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{user.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{user.email}</div>
                    </div>
                    <Link to="/profile" className="navbar-dropdown-item"><User size={15} /> Profile</Link>
                    <Link to="/orders" className="navbar-dropdown-item"><ShoppingCart size={15} /> My Orders</Link>
                    {isAdmin && <Link to="/admin" className="navbar-dropdown-item"><LayoutDashboard size={15} /> Admin</Link>}
                    <button className="navbar-dropdown-item" onClick={handleLogout} style={{ color: 'var(--error)', width: '100%' }}>
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">Sign In</Link>
            )}

            <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      {mobileOpen && <div className="mobile-nav-backdrop" onClick={() => setMobileOpen(false)} />}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--bg-hover)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>✦</span>
            <span style={{ fontWeight: 800, fontSize: 18 }}>Smart Mall</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>A Smarter Way to Shop</p>
        </div>
        {navLinks.map(link => (
          <Link key={link.to} to={link.to} className={`mobile-nav-link ${isActive(link.to) ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
            {link.label}
          </Link>
        ))}
        <div style={{ padding: '8px 16px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1 }}>Smart Features</span>
        </div>
        {[
          { to: '/voice-shopping', label: '🎙️ Voice Shopping' },
          { to: '/scan-go', label: '📱 Scan & Go' },
          { to: '/parking', label: '🅿️ Parking' },
          { to: '/assistant', label: '🤖 AI Assistant' },
          { to: '/crowd-heatmap', label: '🌡️ Crowd Heatmap' },
          { to: '/emergency', label: '🚨 Emergency' },
        ].map(link => (
          <Link key={link.to} to={link.to} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
            {link.label}
          </Link>
        ))}
        {!isAuthenticated && (
          <div style={{ padding: 16 }}>
            <Link to="/login" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setMobileOpen(false)}>
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav">
        <Link to="/" className={`mobile-bottom-item ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link to="/products" className={`mobile-bottom-item ${isActive('/products') ? 'active' : ''}`}>
          <Compass size={20} />
          <span>Explore</span>
        </Link>
        <Link to="/products" className={`mobile-bottom-item ${isActive('/search') ? 'active' : ''}`}>
          <Search size={20} />
          <span>Search</span>
        </Link>
        <Link to="/cart" className={`mobile-bottom-item ${isActive('/cart') ? 'active' : ''}`}>
          <ShoppingCart size={20} />
          <span>Cart</span>
          {cartCount > 0 && <span className="mobile-bottom-badge">{cartCount}</span>}
        </Link>
        <Link to={isAuthenticated ? '/profile' : '/login'} className={`mobile-bottom-item ${isActive('/profile') ? 'active' : ''}`}>
          <User size={20} />
          <span>{isAuthenticated ? 'Profile' : 'Sign In'}</span>
        </Link>
      </div>
    </>
  );
}
