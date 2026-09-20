import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, AlertTriangle, MapPin, Bell, Flame, Heart, Users, Volume2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const CONTACTS = [
  { icon: <Phone size={20} />, label: 'Mall Security', number: '+91 98765 11111', color: '#EF4444' },
  { icon: <Heart size={20} />, label: 'Medical Help', number: '+91 98765 22222', color: '#f59e0b' },
  { icon: <Flame size={20} />, label: 'Fire Emergency', number: '101', color: '#dc2626' },
  { icon: <Shield size={20} />, label: 'Police', number: '100', color: '#3b82f6' },
];

const RECENT_ALERTS = [
  { time: '2 min ago', type: 'info', msg: 'Wet floor near Food Court - Caution advised' },
  { time: '15 min ago', type: 'warning', msg: 'Temporary escalator maintenance on 2nd Floor' },
  { time: '1 hr ago', type: 'success', msg: 'Fire drill completed successfully' },
];

export default function Emergency() {
  const [alertSent, setAlertSent] = useState(false);
  const { addToast } = useToast();

  const sendEmergency = () => {
    setAlertSent(true);
    addToast('🚨 Emergency alert sent! Help is on the way.', 'error');
    setTimeout(() => setAlertSent(false), 5000);
  };

  return (
    <div className="page-wrapper">
      <div className="container section">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 className="section-title animate-fade-in-up">🚨 Emergency & Safety</h1>
          <p className="section-subtitle">Your safety is our top priority</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, maxWidth: 900, margin: '0 auto' }}>
          {/* SOS Button */}
          <div style={{ textAlign: 'center' }}>
            <button className="emergency-btn" onClick={sendEmergency} style={{ margin: '0 auto' }}>
              <AlertTriangle size={40} />
              SOS
            </button>
            <p style={{ marginTop: 16, fontSize: 14, color: 'var(--text-secondary)' }}>Press for immediate assistance</p>

            {alertSent && (
              <div className="animate-bounce-in" style={{ marginTop: 20, padding: 16, background: 'var(--error-light)', borderRadius: 12, border: '1px solid rgba(239,68,68,0.3)' }}>
                <Bell size={24} color="var(--error)" style={{ animation: 'cart-bounce 0.5s ease infinite' }} />
                <p style={{ fontWeight: 700, color: 'var(--error)', marginTop: 8 }}>Alert Sent!</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Security team notified. Help arriving in ~2 minutes.</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Your location: Ground Floor, Near Main Entrance</p>
              </div>
            )}

            {/* Emergency Contacts */}
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, textAlign: 'left' }}>Emergency Contacts</h3>
              {CONTACTS.map((c, i) => (
                <a key={i} href={`tel:${c.number}`} className="queue-card" style={{ marginBottom: 8, textDecoration: 'none' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: c.color + '20', color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {c.icon}
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{c.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{c.number}</div>
                  </div>
                  <Phone size={16} color="var(--text-tertiary)" />
                </a>
              ))}
            </div>
          </div>

          {/* Safety Info */}
          <div>
            <div className="card-flat" style={{ padding: 24, marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🗺️ Evacuation Routes</h3>
              <div style={{ background: 'var(--bg-hover)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <MapPin size={32} color="var(--accent)" />
                <p style={{ fontSize: 13, marginTop: 8, color: 'var(--text-secondary)' }}>
                  Nearest exit: <strong>50m → East Gate</strong><br />
                  Fire assembly point: <strong>Parking Lot B</strong>
                </p>
              </div>
              <div style={{ marginTop: 16 }}>
                {['Emergency exits are marked with green signs on every floor', 'Fire extinguishers are located near every escalator', 'AED devices available at Security Desk and Food Court', 'First aid station: Ground Floor, near Main Entrance'].map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', fontSize: 13 }}>
                    <span>✅</span> {tip}
                  </div>
                ))}
              </div>
            </div>

            <div className="card-flat" style={{ padding: 24, marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>👶 Lost Child Detection</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>Report a missing child immediately. Security cameras and AI will help locate them.</p>
              <Link to="/lost-child" className="btn btn-primary w-full"><Users size={16} /> Report Lost Child</Link>
            </div>

            <div className="card-flat" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Recent Alerts</h3>
              {RECENT_ALERTS.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--bg-hover)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', marginTop: 6, flexShrink: 0, background: a.type === 'warning' ? 'var(--warning)' : a.type === 'info' ? 'var(--info)' : 'var(--success)' }} />
                  <div>
                    <p style={{ fontSize: 13 }}>{a.msg}</p>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{a.time}</span>
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
