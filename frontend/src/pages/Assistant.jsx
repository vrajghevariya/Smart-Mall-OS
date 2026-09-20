import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Bot, User, Sparkles, ShoppingBag, MapPin, Store, Tag, Car } from 'lucide-react';
import { processAssistantQuery, formatPrice, getProductImage } from '../services/data';

const SUGGESTIONS = [
  'Show electronics under ₹3000',
  'Find shoes',
  'Find food offers',
  'Gift under ₹2000',
  'Things for workout',
  'Where is H&M?',
  'Parking availability',
  'Show all offers',
];

export default function Assistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your Smart Mall Assistant 🛍️ I can help you find products, stores, offers, and more. What are you looking for today?', type: 'text' }
  ]);
  const [input, setInput] = useState('');
  const messagesEnd = useRef(null);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = (query = input) => {
    if (!query.trim()) return;
    const userMsg = { role: 'user', content: query, type: 'text' };
    const result = processAssistantQuery(query);
    const botMsg = { role: 'assistant', content: result.text, type: result.type, data: result };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: 24, paddingBottom: 0 }}>
        <div className="chat-container">
          {/* Header */}
          <div style={{ textAlign: 'center', padding: '16px 0', borderBottom: '1px solid #E8EAF0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h1 style={{ fontSize: 18, fontWeight: 800 }}>Smart Mall Assistant</h1>
                <p style={{ fontSize: 12, color: '#6B7194' }}>Rule-based recommendation engine • AI-ready architecture</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role}`}>
                <div className="chat-avatar">
                  {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div>
                  <div className="chat-bubble">{msg.content}</div>
                  
                  {/* Product results */}
                  {msg.data?.products && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8, marginTop: 8 }}>
                      {msg.data.products.slice(0, 6).map(p => (
                        <Link key={p.id} to={`/products/${p.id}`} style={{ background: 'white', borderRadius: 12, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'block', textDecoration: 'none', transition: 'transform 0.2s' }}>
                          {p.image && p.image.startsWith('http') ? (
                            <img src={p.image} alt={p.name} style={{ width: '100%', height: 60, borderRadius: 8, objectFit: 'cover', marginBottom: 8 }} />
                          ) : (
                            <div style={{ width: '100%', height: 60, borderRadius: 8, background: getProductImage(p), marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                              🛍️
                            </div>
                          )}
                          <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{formatPrice(p.price)}</p>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Offer results */}
                  {msg.data?.offers && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                      {msg.data.offers.map(o => (
                        <Link key={o.id} to={`/stores/${o.storeId}`} style={{ background: 'white', borderRadius: 10, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none' }}>
                          <div>
                            <span style={{ fontWeight: 700, color: 'var(--accent)', fontSize: 14 }}>{o.discount}</span>
                            <span style={{ fontSize: 13, marginLeft: 8 }}>{o.title}</span>
                            <p style={{ fontSize: 11, color: '#6B7194' }}>{o.store} • Code: {o.code}</p>
                          </div>
                          <Tag size={16} color="var(--accent)" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Store results */}
                  {msg.data?.stores && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                      {msg.data.stores.map(s => (
                        <Link key={s.id} to={`/stores/${s.id}`} style={{ background: 'white', borderRadius: 10, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                          <span style={{ fontSize: 24 }}>{s.logo}</span>
                          <div>
                            <span style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</span>
                            <p style={{ fontSize: 11, color: '#6B7194' }}>{s.category} • {s.floor}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Navigation link */}
                  {msg.data?.type === 'navigate' && msg.data?.link && (
                    <Link to={msg.data.link} className="btn btn-primary btn-sm" style={{ marginTop: 8 }}>
                      <MapPin size={14} /> Open Mall Map
                    </Link>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEnd} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map(s => (
                <button key={s} className="chat-suggestion-chip" onClick={() => handleSend(s)}>{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-input-area">
            <div className="chat-input-wrapper">
              <input className="chat-input" placeholder="Ask me anything about Smart Mall..." value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button className="chat-send-btn" onClick={() => handleSend()} disabled={!input.trim()}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
