import { stores } from '../services/data';

const QUEUE_DATA = stores.map(s => ({
  ...s,
  waitTime: Math.floor(Math.random() * 25) + 1,
  queueLength: Math.floor(Math.random() * 15),
  trend: Math.random() > 0.5 ? 'increasing' : 'decreasing',
  peakHour: `${Math.floor(Math.random() * 3) + 5}:00 PM`,
  avgWait: Math.floor(Math.random() * 15) + 3,
}));

export default function QueuePrediction() {
  const sorted = [...QUEUE_DATA].sort((a, b) => a.waitTime - b.waitTime);

  return (
    <div className="page-wrapper">
      <div className="container section">
        <div className="section-header">
          <div>
            <h1 className="section-title animate-fade-in-up">⏱️ Queue Prediction</h1>
            <p className="section-subtitle">Real-time estimated wait times at checkout counters</p>
          </div>
        </div>

        <div className="grid-3" style={{ marginBottom: 32 }}>
          <div className="stat-card"><div><div className="stat-card-value" style={{ color: 'var(--success)' }}>{sorted[0].waitTime} min</div><div className="stat-card-label">Shortest Wait</div></div></div>
          <div className="stat-card"><div><div className="stat-card-value">{Math.round(QUEUE_DATA.reduce((s, q) => s + q.waitTime, 0) / QUEUE_DATA.length)} min</div><div className="stat-card-label">Average Wait</div></div></div>
          <div className="stat-card"><div><div className="stat-card-value" style={{ color: 'var(--error)' }}>{sorted[sorted.length - 1].waitTime} min</div><div className="stat-card-label">Longest Wait</div></div></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sorted.map((store, i) => {
            const level = store.waitTime <= 5 ? 'low' : store.waitTime <= 15 ? 'medium' : 'high';
            return (
              <div key={store.id} className="queue-card animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className={`queue-indicator ${level}`}>{store.waitTime}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{store.logo}</span>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700 }}>{store.name}</h3>
                      <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{store.floor} • {store.queueLength} people in queue</p>
                    </div>
                  </div>
                  <div className="queue-bar" style={{ maxWidth: 300 }}>
                    <div className="queue-bar-fill" style={{
                      width: `${Math.min(store.waitTime * 4, 100)}%`,
                      background: level === 'low' ? 'var(--success)' : level === 'medium' ? 'var(--warning)' : 'var(--error)'
                    }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', minWidth: 120 }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: level === 'low' ? 'var(--success)' : level === 'medium' ? 'var(--warning)' : 'var(--error)' }}>
                    {store.waitTime} min
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                    {store.trend === 'increasing' ? '📈 Increasing' : '📉 Decreasing'}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                    Peak: {store.peakHour}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="card-flat" style={{ padding: 20, marginTop: 32, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            💡 <strong>Pro tip:</strong> Visit stores with green indicators for the shortest wait. Queue predictions update every 30 seconds.
          </p>
        </div>
      </div>
    </div>
  );
}
