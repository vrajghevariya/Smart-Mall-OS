import { useState } from 'react';
import { Car, MapPin, Clock, CheckCircle, X } from 'lucide-react';
import { parkingZones } from '../services/data';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Parking() {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [zones, setZones] = useState(parkingZones.map(z => ({
    ...z,
    slots: Array.from({ length: z.total }, (_, i) => ({
      id: `${z.id}-${i + 1}`,
      number: `${z.id}-${String(i + 1).padStart(3, '0')}`,
      status: i < z.occupied ? 'occupied' : i < z.occupied + z.reserved ? 'reserved' : 'available'
    }))
  })));
  const [activeZone, setActiveZone] = useState('P1');
  const [myReservation, setMyReservation] = useState(null);

  const zone = zones.find(z => z.id === activeZone);
  const totalSlots = zones.reduce((s, z) => s + z.total, 0);
  const totalAvailable = zones.reduce((s, z) => s + (z.total - z.occupied - z.reserved), 0);
  const totalOccupied = zones.reduce((s, z) => s + z.occupied, 0);
  const totalReserved = zones.reduce((s, z) => s + z.reserved, 0);

  const handleReserve = (slot) => {
    if (!isAuthenticated) { addToast('Please login to reserve parking', 'warning'); return; }
    if (myReservation) { addToast('You already have a reservation. Cancel it first.', 'warning'); return; }
    setMyReservation(slot.id);
    setZones(prev => prev.map(z => z.id === activeZone ? {
      ...z, reserved: z.reserved + 1,
      slots: z.slots.map(s => s.id === slot.id ? { ...s, status: 'my-reservation' } : s)
    } : z));
    addToast(`Parking spot ${slot.number} reserved!`, 'success');
  };

  const handleCancel = () => {
    setZones(prev => prev.map(z => ({
      ...z, 
      reserved: z.slots.some(s => s.id === myReservation) ? z.reserved - 1 : z.reserved,
      slots: z.slots.map(s => s.id === myReservation ? { ...s, status: 'available' } : s)
    })));
    addToast('Reservation cancelled', 'info');
    setMyReservation(null);
  };

  // Show only first 60 slots for visual grid (performance)
  const displaySlots = zone?.slots.slice(0, 60) || [];

  return (
    <div className="page-wrapper">
      <div className="container section">
        <div className="section-header">
          <div>
            <h1 className="section-title">🅿️ Smart Parking</h1>
            <p className="section-subtitle">Real-time parking availability and reservation</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: 32 }}>
          <div className="stat-card">
            <div><div className="stat-card-value">{totalSlots}</div><div className="stat-card-label">Total Slots</div></div>
            <div className="stat-card-icon" style={{ background: 'var(--primary-subtle)', color: 'var(--accent)' }}><Car size={24} /></div>
          </div>
          <div className="stat-card">
            <div><div className="stat-card-value" style={{ color: 'var(--success)' }}>{totalAvailable}</div><div className="stat-card-label">Available</div></div>
            <div className="stat-card-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}><CheckCircle size={24} /></div>
          </div>
          <div className="stat-card">
            <div><div className="stat-card-value" style={{ color: 'var(--error)' }}>{totalOccupied}</div><div className="stat-card-label">Occupied</div></div>
            <div className="stat-card-icon" style={{ background: 'var(--error-light)', color: 'var(--error)' }}><X size={24} /></div>
          </div>
          <div className="stat-card">
            <div><div className="stat-card-value" style={{ color: 'var(--warning)' }}>{totalReserved}</div><div className="stat-card-label">Reserved</div></div>
            <div className="stat-card-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}><Clock size={24} /></div>
          </div>
        </div>

        {/* My Reservation */}
        {myReservation && (
          <div className="card-flat" style={{ padding: 20, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--primary-subtle)', border: '2px solid var(--accent)' }}>
            <div>
              <span style={{ fontWeight: 700, color: 'var(--accent)' }}>Your Reserved Spot: {myReservation}</span>
              <p style={{ fontSize: 12, color: '#6B7194', marginTop: 4 }}>Remember your parking spot number!</p>
            </div>
            <button className="btn btn-danger btn-sm" onClick={handleCancel}>Cancel Reservation</button>
          </div>
        )}

        {/* Zone Tabs */}
        <div className="tabs">
          {zones.map(z => (
            <button key={z.id} className={`tab ${activeZone === z.id ? 'active' : ''}`} onClick={() => setActiveZone(z.id)}>
              {z.name} ({z.total - z.occupied - z.reserved} free)
            </button>
          ))}
        </div>

        {/* Zone Info */}
        <div className="card-flat" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>{zone?.name}</h3>
              <p style={{ fontSize: 13, color: '#6B7194' }}>{zone?.floor}</p>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--success-light)', border: '1px solid var(--success)' }}></span> Available</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--error-light)', border: '1px solid var(--error)' }}></span> Occupied</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--warning-light)', border: '1px solid var(--warning)' }}></span> Reserved</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--primary-subtle)', border: '2px solid var(--accent)' }}></span> Your Spot</span>
            </div>
          </div>

          <div className="parking-grid">
            {displaySlots.map(slot => (
              <div key={slot.id}
                className={`parking-slot ${slot.status === 'my-reservation' ? 'my-reservation' : slot.status}`}
                onClick={() => slot.status === 'available' && handleReserve(slot)}
                title={slot.status === 'available' ? `Click to reserve ${slot.number}` : slot.number}
              >
                {slot.number.split('-')[1]}
              </div>
            ))}
          </div>
          {zone && zone.total > 60 && (
            <p style={{ textAlign: 'center', fontSize: 12, color: '#9BA1BF', marginTop: 12 }}>Showing first 60 of {zone.total} slots</p>
          )}
        </div>
      </div>
    </div>
  );
}
