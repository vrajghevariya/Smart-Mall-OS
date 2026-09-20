import { offers, formatPrice } from '../services/data';
import { Tag, Clock, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Offers() {
  return (
    <div className="page-wrapper">
      <div className="container section">
        <div className="section-header">
          <div>
            <h1 className="section-title">🏷️ All Offers</h1>
            <p className="section-subtitle">{offers.length} active offers</p>
          </div>
        </div>
        <div className="grid-3">
          {offers.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-card-body">
                <div className="offer-card-discount">{offer.discount}</div>
                <h3 className="offer-card-title">{offer.title}</h3>
                <p className="offer-card-store"><Store size={12} style={{ verticalAlign: -1 }} /> {offer.store}</p>
                <p style={{ fontSize: 13, color: '#6B7194', margin: '8px 0 16px', lineHeight: 1.6 }}>{offer.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                  <span className="badge badge-primary">Code: {offer.code}</span>
                  <span className="badge badge-info">Min. {formatPrice(offer.minPurchase)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="offer-card-validity"><Clock size={12} style={{ verticalAlign: -1 }} /> Until {new Date(offer.validUntil).toLocaleDateString()}</span>
                  <Link to={`/stores/${offer.storeId}`} className="btn btn-sm btn-outline">Visit Store</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
