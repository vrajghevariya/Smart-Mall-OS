import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Users, Coffee, Car, ArrowUpDown, ChevronRight } from 'lucide-react';
import { stores } from '../services/data';

const FLOORS = {
  'Ground Floor': {
    stores: stores.filter(s => s.floor === 'Ground Floor'),
    amenities: [
      { name: 'Main Entrance', icon: '🚪', x: 50, y: 90 },
      { name: 'Escalator', icon: '↗️', x: 50, y: 50 },
      { name: 'Elevator', icon: '🛗', x: 85, y: 50 },
      { name: 'Restrooms', icon: '🚻', x: 90, y: 85 },
      { name: 'Parking Access', icon: '🅿️', x: 10, y: 90 },
      { name: 'You Are Here', icon: '📍', x: 50, y: 80 },
    ],
    storePositions: [
      { id: 1, x: 15, y: 25, w: 30, h: 25 },  // TechWorld
      { id: 3, x: 55, y: 25, w: 30, h: 25 },  // SportZone
      { id: 6, x: 15, y: 55, w: 30, h: 20 },  // UrbanCarry
    ]
  },
  '1st Floor': {
    stores: stores.filter(s => s.floor === '1st Floor'),
    amenities: [
      { name: 'Escalator', icon: '↗️', x: 50, y: 50 },
      { name: 'Elevator', icon: '🛗', x: 85, y: 50 },
      { name: 'Restrooms', icon: '🚻', x: 90, y: 15 },
    ],
    storePositions: [
      { id: 2, x: 15, y: 20, w: 35, h: 30 },  // H&M
      { id: 4, x: 55, y: 20, w: 30, h: 30 },  // GlowUp
    ]
  },
  '2nd Floor': {
    stores: stores.filter(s => s.floor === '2nd Floor'),
    amenities: [
      { name: 'Escalator', icon: '↗️', x: 50, y: 50 },
      { name: 'Elevator', icon: '🛗', x: 85, y: 50 },
      { name: 'Food Court', icon: '🍽️', x: 50, y: 15 },
      { name: 'Restrooms', icon: '🚻', x: 90, y: 85 },
    ],
    storePositions: [
      { id: 5, x: 15, y: 15, w: 30, h: 25 },  // Brew Lab
      { id: 7, x: 55, y: 55, w: 30, h: 25 },  // HomeHub
      { id: 8, x: 15, y: 55, w: 30, h: 25 },  // BookNest
    ]
  }
};

export default function MallMap() {
  const [activeFloor, setActiveFloor] = useState('Ground Floor');
  const [selectedStore, setSelectedStore] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const floor = FLOORS[activeFloor];

  return (
    <div className="page-wrapper">
      <div className="container section">
        <div className="section-header">
          <div>
            <h1 className="section-title">🗺️ Mall Map</h1>
            <p className="section-subtitle">Interactive floor plan — click on stores for details</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          {/* Map */}
          <div className="mall-map-container">
            <div className="mall-map-toolbar">
              <div className="mall-map-floors">
                {Object.keys(FLOORS).map(f => (
                  <button key={f} className={`floor-btn ${activeFloor === f ? 'active' : ''}`} onClick={() => { setActiveFloor(f); setSelectedStore(null); setShowRoute(false); }}>
                    {f}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6B7194' }}>
                <MapPin size={14} /> Floor Plan
              </div>
            </div>

            <div className="mall-map-svg">
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: 'auto', minHeight: 400 }}>
                {/* Floor background */}
                <rect x="5" y="5" width="90" height="90" rx="4" fill="#F7F8FC" stroke="#E2E4ED" strokeWidth="0.5" />
                
                {/* Grid lines */}
                {[20, 40, 60, 80].map(n => (
                  <g key={n}>
                    <line x1={n} y1="5" x2={n} y2="95" stroke="#F0F1F7" strokeWidth="0.2" />
                    <line x1="5" y1={n} x2="95" y2={n} stroke="#F0F1F7" strokeWidth="0.2" />
                  </g>
                ))}

                {/* Walkway */}
                <rect x="5" y="47" width="90" height="6" fill="#E8EAF0" rx="1" />
                <rect x="47" y="5" width="6" height="90" fill="#E8EAF0" rx="1" />

                {/* Stores */}
                {floor.storePositions.map(pos => {
                  const store = stores.find(s => s.id === pos.id);
                  if (!store) return null;
                  const isSelected = selectedStore?.id === store.id;
                  return (
                    <g key={store.id} onClick={() => { setSelectedStore(store); setShowRoute(false); }} style={{ cursor: 'pointer' }}>
                      <rect x={pos.x} y={pos.y} width={pos.w} height={pos.h} rx="2"
                        fill={isSelected ? '#7048F5' : '#E8EAF0'}
                        stroke={isSelected ? '#5835CC' : '#D1D5DB'} strokeWidth="0.5"
                        style={{ transition: 'fill 0.2s' }}
                      />
                      <text x={pos.x + pos.w / 2} y={pos.y + pos.h / 2 - 2} textAnchor="middle" fontSize="3" fontWeight="700" fill={isSelected ? 'white' : '#11152B'}>
                        {store.logo}
                      </text>
                      <text x={pos.x + pos.w / 2} y={pos.y + pos.h / 2 + 4} textAnchor="middle" fontSize="2.5" fontWeight="600" fill={isSelected ? 'white' : '#6B7194'}>
                        {store.name}
                      </text>
                    </g>
                  );
                })}

                {/* Route line */}
                {showRoute && selectedStore && (
                  <g>
                    {(() => {
                      const pos = floor.storePositions.find(p => p.id === selectedStore.id);
                      if (!pos) return null;
                      const storeCenter = { x: pos.x + pos.w / 2, y: pos.y + pos.h / 2 };
                      return (
                        <>
                          <line x1="50" y1="80" x2="50" y2="50" stroke="#7048F5" strokeWidth="0.8" strokeDasharray="2,1" />
                          <line x1="50" y1="50" x2={storeCenter.x} y2="50" stroke="#7048F5" strokeWidth="0.8" strokeDasharray="2,1" />
                          <line x1={storeCenter.x} y1="50" x2={storeCenter.x} y2={storeCenter.y} stroke="#7048F5" strokeWidth="0.8" strokeDasharray="2,1" />
                          <circle cx={storeCenter.x} cy={storeCenter.y} r="1.5" fill="#7048F5" />
                        </>
                      );
                    })()}
                  </g>
                )}

                {/* Amenities */}
                {floor.amenities.map((a, i) => (
                  <g key={i}>
                    <text x={a.x} y={a.y} textAnchor="middle" fontSize="3.5">{a.icon}</text>
                    <text x={a.x} y={a.y + 4} textAnchor="middle" fontSize="1.8" fill="#9BA1BF" fontWeight="500">{a.name}</text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 20, padding: '12px 24px', borderTop: '1px solid #E8EAF0', fontSize: 12, color: '#6B7194', flexWrap: 'wrap' }}>
              <span>🚪 Entrance</span>
              <span>↗️ Escalator</span>
              <span>🛗 Elevator</span>
              <span>🚻 Restrooms</span>
              <span>🍽️ Food Court</span>
              <span>🅿️ Parking</span>
              <span>📍 You Are Here</span>
            </div>
          </div>

          {/* Store Info Panel */}
          <div>
            {selectedStore ? (
              <div className="card-flat" style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                    {selectedStore.logo}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>{selectedStore.name}</h3>
                    <p style={{ fontSize: 12, color: '#6B7194' }}>{selectedStore.category} • {selectedStore.floor}</p>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: '#6B7194', lineHeight: 1.7, marginBottom: 16 }}>{selectedStore.description}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button className="btn btn-primary w-full" onClick={() => setShowRoute(!showRoute)}>
                    <Navigation size={16} /> {showRoute ? 'Hide Route' : 'Navigate Here'}
                  </button>
                  <Link to={`/stores/${selectedStore.id}`} className="btn btn-secondary w-full">
                    View Store <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="card-flat" style={{ padding: 24, textAlign: 'center' }}>
                <MapPin size={32} color="var(--text-tertiary)" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Select a Store</h3>
                <p style={{ fontSize: 13, color: '#6B7194' }}>Click on any store on the map to view details and navigate.</p>
              </div>
            )}

            {/* Floor Directory */}
            <div className="card-flat" style={{ padding: 24, marginTop: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Stores on {activeFloor}</h3>
              {floor.stores.map(s => (
                <div key={s.id} onClick={() => { setSelectedStore(s); setShowRoute(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #F0F1F7', cursor: 'pointer', fontSize: 13 }}>
                  <span style={{ fontSize: 18 }}>{s.logo}</span>
                  <span style={{ fontWeight: 600, flex: 1 }}>{s.name}</span>
                  <span className={`store-card-status ${s.isOpen ? 'open' : 'closed'}`} style={{ fontSize: 11 }}>
                    {s.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
