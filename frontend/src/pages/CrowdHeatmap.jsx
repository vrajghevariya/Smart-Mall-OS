import { useState } from 'react';
import { stores } from '../services/data';

const HEATMAP_DATA = [
  { zone: 'Main Entrance', x: 50, y: 88, density: 85, people: 120 },
  { zone: 'TechWorld', x: 22, y: 30, density: 70, people: 45 },
  { zone: 'H&M', x: 28, y: 25, density: 90, people: 78 },
  { zone: 'Food Court', x: 50, y: 18, density: 95, people: 150 },
  { zone: 'Escalator Area', x: 50, y: 50, density: 60, people: 35 },
  { zone: 'SportZone', x: 72, y: 30, density: 40, people: 20 },
  { zone: 'GlowUp', x: 72, y: 25, density: 55, people: 30 },
  { zone: 'Brew Lab', x: 25, y: 20, density: 75, people: 55 },
  { zone: 'BookNest', x: 25, y: 60, density: 30, people: 15 },
  { zone: 'Parking Entrance', x: 12, y: 88, density: 45, people: 25 },
  { zone: 'Restrooms', x: 88, y: 45, density: 35, people: 18 },
  { zone: 'Elevator', x: 85, y: 50, density: 25, people: 12 },
];

function getDensityColor(density) {
  if (density >= 80) return 'rgba(239, 68, 68, 0.6)';
  if (density >= 60) return 'rgba(245, 166, 35, 0.5)';
  if (density >= 40) return 'rgba(245, 166, 35, 0.3)';
  return 'rgba(32, 180, 134, 0.3)';
}

function getDensitySize(density) {
  return 20 + density * 0.6;
}

export default function CrowdHeatmap() {
  const [selectedZone, setSelectedZone] = useState(null);
  const totalPeople = HEATMAP_DATA.reduce((s, z) => s + z.people, 0);
  const avgDensity = Math.round(HEATMAP_DATA.reduce((s, z) => s + z.density, 0) / HEATMAP_DATA.length);

  return (
    <div className="page-wrapper">
      <div className="container section">
        <div className="section-header">
          <div>
            <h1 className="section-title animate-fade-in-up">🌡️ Live Crowd Heatmap</h1>
            <p className="section-subtitle">Real-time crowd density across the mall</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: 32 }}>
          <div className="stat-card"><div><div className="stat-card-value">{totalPeople}</div><div className="stat-card-label">People in Mall</div></div></div>
          <div className="stat-card"><div><div className="stat-card-value">{avgDensity}%</div><div className="stat-card-label">Avg Density</div></div></div>
          <div className="stat-card"><div><div className="stat-card-value" style={{ color: 'var(--error)' }}>{HEATMAP_DATA.filter(z => z.density >= 80).length}</div><div className="stat-card-label">Crowded Zones</div></div></div>
          <div className="stat-card"><div><div className="stat-card-value" style={{ color: 'var(--success)' }}>{HEATMAP_DATA.filter(z => z.density < 40).length}</div><div className="stat-card-label">Quiet Zones</div></div></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          {/* Heatmap */}
          <div className="card-flat" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ position: 'relative', paddingBottom: '70%', background: 'var(--bg-hover)' }}>
              <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <rect x="5" y="5" width="90" height="90" rx="4" fill="var(--bg-card)" stroke="var(--text-tertiary)" strokeWidth="0.3" strokeOpacity="0.3" />
                <rect x="5" y="47" width="90" height="6" fill="var(--bg-hover)" rx="1" opacity="0.5" />
                <rect x="47" y="5" width="6" height="90" fill="var(--bg-hover)" rx="1" opacity="0.5" />
                
                {HEATMAP_DATA.map((zone, i) => {
                  const size = getDensitySize(zone.density);
                  return (
                    <g key={i} onClick={() => setSelectedZone(zone)} style={{ cursor: 'pointer' }}>
                      <circle cx={zone.x} cy={zone.y} r={size / 4} fill={getDensityColor(zone.density)} style={{ animation: `heatmap-pulse ${2 + Math.random()}s ease-in-out infinite`, animationDelay: `${Math.random() * 2}s` }} />
                      <circle cx={zone.x} cy={zone.y} r={size / 8} fill={getDensityColor(zone.density)} opacity="0.8" />
                      <text x={zone.x} y={zone.y + size / 4 + 4} textAnchor="middle" fontSize="2.2" fill="var(--text-secondary)" fontWeight="600">{zone.zone}</text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="heatmap-legend">
              <div className="heatmap-legend-item"><div className="heatmap-legend-dot" style={{ background: 'rgba(32,180,134,0.5)' }} /> Low (&lt;40%)</div>
              <div className="heatmap-legend-item"><div className="heatmap-legend-dot" style={{ background: 'rgba(245,166,35,0.5)' }} /> Medium (40-60%)</div>
              <div className="heatmap-legend-item"><div className="heatmap-legend-dot" style={{ background: 'rgba(245,166,35,0.7)' }} /> High (60-80%)</div>
              <div className="heatmap-legend-item"><div className="heatmap-legend-dot" style={{ background: 'rgba(239,68,68,0.7)' }} /> Very High (&gt;80%)</div>
            </div>
          </div>

          {/* Zone Details */}
          <div>
            {selectedZone ? (
              <div className="card-flat animate-scale-in" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{selectedZone.zone}</h3>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Crowd Density</span>
                    <span style={{ fontWeight: 700 }}>{selectedZone.density}%</span>
                  </div>
                  <div className="queue-bar"><div className="queue-bar-fill" style={{ width: `${selectedZone.density}%`, background: getDensityColor(selectedZone.density).replace(/[\d.]+\)$/, '1)') }} /></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>People Count</span>
                  <span style={{ fontWeight: 700 }}>{selectedZone.people}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Status</span>
                  <span className={`badge ${selectedZone.density >= 80 ? 'badge-error' : selectedZone.density >= 50 ? 'badge-warning' : 'badge-success'}`}>
                    {selectedZone.density >= 80 ? 'Very Crowded' : selectedZone.density >= 50 ? 'Moderate' : 'Quiet'}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 16 }}>
                  {selectedZone.density >= 80 ? '⚠️ Consider visiting later or choosing a different route.' : selectedZone.density >= 50 ? 'Moderate crowd. Normal wait times expected.' : '✅ Great time to visit! Low crowd density.'}
                </p>
              </div>
            ) : (
              <div className="card-flat" style={{ padding: 24, textAlign: 'center' }}>
                <p style={{ color: 'var(--text-tertiary)', fontSize: 14 }}>Click on any zone on the heatmap to see details</p>
              </div>
            )}

            <div className="card-flat" style={{ padding: 24, marginTop: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>All Zones</h4>
              {HEATMAP_DATA.sort((a, b) => b.density - a.density).map((zone, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--bg-hover)', cursor: 'pointer', fontSize: 13 }} onClick={() => setSelectedZone(zone)}>
                  <span style={{ fontWeight: 500 }}>{zone.zone}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{zone.people} people</span>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: getDensityColor(zone.density).replace(/[\d.]+\)$/, '1)') }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
