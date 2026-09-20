import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Tag, ArrowLeft, Navigation, Package, MessageSquare } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getStoreById, getProductsByStore, getOffersByStore, formatPrice } from '../services/data';

export default function StoreDetails() {
  const { id } = useParams();
  const store = getStoreById(id);
  const storeProducts = getProductsByStore(id);
  const storeOffers = getOffersByStore(id);
  const [activeTab, setActiveTab] = useState('products');
  const [imgError, setImgError] = useState(false);

  if (!store) return (
    <div className="page-wrapper">
      <div className="container section" style={{ textAlign: 'center', padding: 80 }}>
        <p style={{ fontSize: 48, marginBottom: 16 }}>🏪</p>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Store not found</h3>
        <Link to="/stores" className="btn btn-primary">Back to Stores</Link>
      </div>
    </div>
  );

  const hasBannerImage = store.banner?.startsWith('http') && !imgError;

  const tabs = [
    { id: 'products', label: 'Products', count: storeProducts.length },
    { id: 'offers', label: 'Offers', count: storeOffers.length },
    { id: 'about', label: 'About' },
  ];

  return (
    <div className="page-wrapper">
      {/* Banner */}
      <div style={{ height: 280, position: 'relative', overflow: 'hidden', background: store.bannerGradient || 'var(--primary-gradient)' }}>
        {hasBannerImage && (
          <img
            src={store.banner}
            alt={store.name}
            onError={() => setImgError(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }} />
        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 32 }}>
          <Link to="/stores" style={{ position: 'absolute', top: 24, left: 24, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', borderRadius: 10, color: 'white', fontSize: 13, fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
            <ArrowLeft size={16} /> Back
          </Link>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}>
            <div style={{ width: 72, height: 72, borderRadius: 18, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>{store.logo}</span>
            </div>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{store.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6, color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={14} fill="#FBBF24" stroke="#FBBF24" /> {store.rating}
                </span>
                <span>•</span>
                <span>{store.category}</span>
                <span>•</span>
                <span>{store.floor}</span>
                <span>•</span>
                <span className={`store-card-status ${store.isOpen ? 'open' : 'closed'}`} style={{ fontSize: 12 }}>
                  {store.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--bg-hover)', position: 'sticky', top: 72, zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', gap: 4 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '14px 20px', fontSize: 13, fontWeight: 600,
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-tertiary)',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
                background: 'none', cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: 'var(--font-family)',
              }}
            >
              {tab.label} {tab.count !== undefined && <span style={{ fontSize: 11, opacity: 0.7 }}>({tab.count})</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="container section">
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            {storeProducts.length > 0 ? (
              <div className="grid-4">
                {storeProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 60 }}>
                <p style={{ fontSize: 48, marginBottom: 16 }}>📦</p>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No products listed</h3>
                <p style={{ color: 'var(--text-tertiary)' }}>Check back soon for new arrivals.</p>
              </div>
            )}
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === 'offers' && (
          <div>
            {storeOffers.length > 0 ? (
              <div className="grid-3">
                {storeOffers.map(offer => (
                  <div key={offer.id} className="card" style={{ padding: 24, borderLeft: '4px solid var(--accent)' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent)', marginBottom: 8 }}>{offer.discount}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{offer.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 12, lineHeight: 1.5 }}>{offer.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <code style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', background: 'var(--accent-subtle)', color: 'var(--accent)', borderRadius: 6 }}>{offer.code}</code>
                      <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Min. {formatPrice(offer.minPurchase)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 60 }}>
                <p style={{ fontSize: 48, marginBottom: 16 }}>🏷️</p>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No active offers</h3>
                <p style={{ color: 'var(--text-tertiary)' }}>Stay tuned for upcoming deals!</p>
              </div>
            )}
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>About {store.name}</h2>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>{store.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { icon: <Clock size={18} />, label: 'Hours', value: store.hours },
                { icon: <MapPin size={18} />, label: 'Floor', value: store.floor },
                { icon: <Tag size={18} />, label: 'Category', value: store.category },
                { icon: <Star size={18} />, label: 'Rating', value: `${store.rating} (${store.reviews.toLocaleString()} reviews)` },
                { icon: <Package size={18} />, label: 'Products', value: `${storeProducts.length} items` },
                { icon: <MapPin size={18} />, label: 'Location', value: store.location },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--bg-hover)' }}>
                  <div style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <Link to="/mall-map" className="btn btn-primary"><Navigation size={16} /> Navigate to Store</Link>
              <Link to={`/products?store=${store.name}`} className="btn btn-secondary"><Package size={16} /> View All Products</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
