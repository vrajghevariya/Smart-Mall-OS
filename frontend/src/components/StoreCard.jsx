import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';

export default function StoreCard({ store }) {
  const [imgError, setImgError] = useState(false);
  const hasBannerImage = store.banner && store.banner.startsWith('http') && !imgError;

  return (
    <Link to={`/stores/${store.id}`} className="store-card">
      <div className="store-card-banner" style={{ background: store.bannerGradient || 'var(--primary-gradient)' }}>
        {hasBannerImage && (
          <img
            src={store.banner}
            alt={store.name}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
          />
        )}
        <div className="store-card-logo">
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em', color: 'white', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
            {store.logo || store.name}
          </span>
        </div>
      </div>
      <div className="store-card-body">
        <h3 className="store-card-name">{store.name}</h3>
        <p className="store-card-category">{store.category}</p>
        <div className="store-card-meta">
          <span><Star size={12} fill="#FBBF24" stroke="#FBBF24" /> {store.rating}</span>
          <span><MapPin size={12} /> {store.floor}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <span className={`store-card-status ${store.isOpen ? 'open' : 'closed'}`}>
            {store.isOpen ? 'Open Now' : 'Closed'}
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
            {store.location}
          </span>
        </div>
      </div>
    </Link>
  );
}
