import { Link } from 'react-router-dom';
import { Store, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand"><Store size={24} /> Smart Mall</div>
            <p className="footer-desc">A smarter way to shop. Discover stores, products, offers and smarter ways to shop — all in one mall.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={16} />
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={16} />
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={16} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <Link to="/stores" className="footer-link">Stores</Link>
            <Link to="/products" className="footer-link">Products</Link>
            <Link to="/offers" className="footer-link">Offers</Link>
            <Link to="/mall-map" className="footer-link">Mall Map</Link>
            <Link to="/parking" className="footer-link">Parking</Link>
          </div>
          <div>
            <h4 className="footer-heading">Services</h4>
            <Link to="/assistant" className="footer-link">Smart Assistant</Link>
            <Link to="/cart" className="footer-link">Shopping Cart</Link>
            <Link to="/orders" className="footer-link">My Orders</Link>
            <Link to="/wishlist" className="footer-link">Wishlist</Link>
            <Link to="/profile" className="footer-link">My Profile</Link>
          </div>
          <div>
            <h4 className="footer-heading">Contact</h4>
            <p className="footer-link">info@smartmall.com</p>
            <p className="footer-link">+91 98765 43210</p>
            <p className="footer-link">Smart Mall Complex</p>
            <p className="footer-link">Tech Park Road</p>
            <p className="footer-link">Ahmedabad, Gujarat</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Smart Mall. All rights reserved.</span>
          <span>Built with ❤️ by Vraj, Jeel & Rudra</span>
        </div>
      </div>
    </footer>
  );
}
