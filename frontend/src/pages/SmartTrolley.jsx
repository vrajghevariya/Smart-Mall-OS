import { useState, useEffect } from 'react';
import { ShoppingCart, MapPin, Clock, Zap, BarChart3 } from 'lucide-react';

const TROLLEY_ITEMS = [
  { id: 1, name: 'MacBook Air M3', price: 134900, qty: 1, category: 'Electronics' },
  { id: 2, name: 'Slim Fit Cotton Shirt', price: 1499, qty: 2, category: 'Fashion' },
  { id: 3, name: 'Cold Brew Coffee', price: 299, qty: 1, category: 'Food & Beverage' },
];

const ROUTE = [
  { x: 20, y: 80, label: 'Start - Entrance' },
  { x: 20, y: 40, label: 'TechWorld' },
  { x: 50, y: 40, label: 'H&M' },
  { x: 50, y: 20, label: 'Food Court' },
  { x: 80, y: 20, label: 'Brew Lab' },
  { x: 80, y: 60, label: 'Checkout' },
];

export default function SmartTrolley() {
  const [position, setPosition] = useState(0);
  const [trolleyItems] = useState(TROLLEY_ITEMS);
  const total = trolleyItems.reduce((s, i) => s + i.price * i.qty, 0);
  const totalWeight = 2.4; // kg demo

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => (prev + 1) % ROUTE.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = ROUTE[position];

  return (
    <div className="page-wrapper">
      <div className="container section">
        <div className="section-header">
          <div>
            <h1 className="section-title animate-fade-in-up">🛒 Smart Trolley</h1>
            <p className="section-subtitle">IoT-powered shopping trolley with real-time tracking</p>
          </div>
        </div>

        <div className="grid-4" style={{ marginBottom: 32 }}>
          <div className="stat-card"><div><div className="stat-card-value">{trolleyItems.length}</div><div className="stat-card-label">Items in Trolley</div></div><div className="stat-card-icon" style={{ background: 'var(--primary-subtle)', color: 'var(--accent)' }}><ShoppingCart size={24} /></div></div>
          <div className="stat-card"><div><div className="stat-card-value">₹{(total / 100).toFixed(0)}K</div><div className="stat-card-label">Running Total</div></div><div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><Zap size={24} /></div></div>
          <div className="stat-card"><div><div className="stat-card-value">{totalWeight} kg</div><div className="stat-card-label">Trolley Weight</div></div><div className="stat-card-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}><BarChart3 size={24} /></div></div>
          <div className="stat-card"><div><div className="stat-card-value">{current.label.split(' - ')[0]}</div><div className="stat-card-label">Current Location</div></div><div className="stat-card-icon" style={{ background: 'var(--info-light)', color: 'var(--info)' }}><MapPin size={24} /></div></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
          {/* Trolley Map */}
          <div className="trolley-map">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Trolley Location</h3>
            <div style={{ position: 'relative', paddingBottom: '60%', background: 'var(--bg-hover)', borderRadius: 14, overflow: 'hidden' }}>
              <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <rect x="5" y="5" width="90" height="90" rx="3" fill="none" stroke="var(--text-tertiary)" strokeWidth="0.3" strokeOpacity="0.3" />
                
                {/* Route path */}
                <polyline points={ROUTE.map(r => `${r.x},${r.y}`).join(' ')} fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2,1" opacity="0.4" />
                
                {/* Route stops */}
                {ROUTE.map((r, i) => (
                  <g key={i}>
                    <circle cx={r.x} cy={r.y} r={i === position ? 3 : 1.5} fill={i === position ? 'var(--accent)' : 'var(--text-tertiary)'} opacity={i === position ? 1 : 0.4} />
                    <text x={r.x} y={r.y - 4} textAnchor="middle" fontSize="2.2" fill="var(--text-secondary)" fontWeight="500">{r.label}</text>
                    {i === position && (
                      <circle cx={r.x} cy={r.y} r="5" fill="var(--accent)" opacity="0.15">
                        <animate attributeName="r" values="3;7;3" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                ))}

                {/* Trolley icon */}
                <text x={current.x} y={current.y + 1} textAnchor="middle" fontSize="5" style={{ transition: 'all 1s ease' }}>🛒</text>
              </svg>
            </div>

            {/* Route timeline */}
            <div style={{ marginTop: 20 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Shopping Route</h4>
              {ROUTE.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0', opacity: i <= position ? 1 : 0.4 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: i <= position ? 'var(--accent)' : 'var(--bg-hover)', color: i <= position ? 'white' : 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                    {i < position ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: i === position ? 700 : 400 }}>{r.label}</span>
                  {i === position && <span className="badge badge-primary" style={{ marginLeft: 'auto' }}>Current</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Trolley Contents */}
          <div>
            <div className="card-flat" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🛒 Trolley Contents</h3>
              {trolleyItems.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--bg-hover)', fontSize: 14 }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{item.category} × {item.qty}</div>
                  </div>
                  <span style={{ fontWeight: 700 }}>₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, fontWeight: 800, fontSize: 18 }}>
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="card-flat" style={{ padding: 20, marginTop: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Trolley Stats</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0' }}><span style={{ color: 'var(--text-secondary)' }}>Battery</span><span style={{ fontWeight: 600 }}>87% 🔋</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0' }}><span style={{ color: 'var(--text-secondary)' }}>Weight</span><span style={{ fontWeight: 600 }}>{totalWeight} kg</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0' }}><span style={{ color: 'var(--text-secondary)' }}>Speed</span><span style={{ fontWeight: 600 }}>Walking Pace</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0' }}><span style={{ color: 'var(--text-secondary)' }}>Connection</span><span style={{ fontWeight: 600, color: 'var(--success)' }}>● Connected</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
