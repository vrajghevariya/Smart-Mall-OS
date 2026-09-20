import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Search, Loader2, ArrowLeft, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { intelligentSearch, extractSearchIntent } from '../services/data';

const STATES = { IDLE: 'idle', LISTENING: 'listening', PROCESSING: 'processing', SEARCHING: 'searching', RESULTS: 'results', ERROR: 'error' };

export default function VoiceShopping() {
  const [state, setState] = useState(STATES.IDLE);
  const [transcript, setTranscript] = useState('');
  const [results, setResults] = useState([]);
  const [intent, setIntent] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const recognitionRef = useRef(null);
  const [manualQuery, setManualQuery] = useState('');

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setErrorMsg('Voice recognition is not supported in this browser. Try Chrome or Edge.');
      setState(STATES.ERROR);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => setState(STATES.LISTENING);
    recognition.onresult = (event) => {
      const text = Array.from(event.results).map(r => r[0].transcript).join('');
      setTranscript(text);
    };
    recognition.onend = () => {
      if (transcript.trim()) processQuery(transcript);
      else setState(STATES.IDLE);
    };
    recognition.onerror = (e) => {
      console.error('Speech error:', e.error);
      if (e.error === 'not-allowed') setErrorMsg('Microphone access denied. Please allow microphone access.');
      else setErrorMsg('Could not recognize speech. Please try again.');
      setState(STATES.ERROR);
    };
    recognitionRef.current = recognition;
    recognition.start();
    setTranscript('');
    setResults([]);
    setIntent(null);
    setErrorMsg('');
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  const processQuery = async (query) => {
    setState(STATES.PROCESSING);
    await new Promise(r => setTimeout(r, 600));
    setState(STATES.SEARCHING);

    const searchIntent = extractSearchIntent(query);
    setIntent(searchIntent);

    await new Promise(r => setTimeout(r, 400));

    const { results: searchResults } = intelligentSearch(query);
    setResults(searchResults);
    setState(STATES.RESULTS);
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (manualQuery.trim()) {
      setTranscript(manualQuery.trim());
      processQuery(manualQuery.trim());
    }
  };

  const stateLabel = { [STATES.IDLE]: 'Tap the mic to start', [STATES.LISTENING]: 'Listening...', [STATES.PROCESSING]: 'Processing...', [STATES.SEARCHING]: 'Searching products...', [STATES.RESULTS]: `Found ${results.length} products`, [STATES.ERROR]: 'Error' };

  return (
    <div className="page-wrapper">
      <div className="container section">
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 24, textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back
        </Link>

        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'var(--font-3xl)', fontWeight: 800, marginBottom: 8 }}>🎙️ Voice Shopping</h1>
          <p style={{ color: 'var(--text-tertiary)', marginBottom: 40 }}>Search products, brands, and stores with your voice</p>

          {/* Mic button with animated rings */}
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
            {state === STATES.LISTENING && (
              <>
                <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', border: '2px solid var(--accent)', opacity: 0.3, animation: 'voiceRing 2s ease-out infinite' }} />
                <div style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', border: '2px solid var(--accent)', opacity: 0.15, animation: 'voiceRing 2s ease-out infinite 0.5s' }} />
              </>
            )}
            <button
              onClick={state === STATES.LISTENING ? stopListening : startListening}
              style={{
                width: 80, height: 80, borderRadius: '50%',
                background: state === STATES.LISTENING ? 'var(--error)' : 'var(--primary-gradient)',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', border: 'none', transition: 'all 0.3s',
                boxShadow: state === STATES.LISTENING ? '0 0 40px rgba(239,68,68,0.3)' : 'var(--shadow-accent)',
              }}
            >
              {state === STATES.LISTENING ? <MicOff size={28} /> : state === STATES.PROCESSING || state === STATES.SEARCHING ? <Loader2 size={28} className="spin" /> : <Mic size={28} />}
            </button>
          </div>

          <p style={{ fontSize: 14, fontWeight: 600, color: state === STATES.ERROR ? 'var(--error)' : state === STATES.RESULTS ? 'var(--success)' : 'var(--text-secondary)', marginBottom: 8 }}>
            {stateLabel[state]}
          </p>

          {errorMsg && <p style={{ fontSize: 13, color: 'var(--error)', marginBottom: 16 }}>{errorMsg}</p>}

          {/* Transcript display */}
          {transcript && (
            <div style={{ padding: '16px 24px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--bg-hover)', marginBottom: 24, textAlign: 'left' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1 }}>🎙️ You said:</span>
              <p style={{ fontSize: 17, fontWeight: 600, marginTop: 6, color: 'var(--text-primary)' }}>"{transcript}"</p>
            </div>
          )}

          {/* Extracted intent display */}
          {intent && state === STATES.RESULTS && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
              {intent.brand && (
                <span style={{ padding: '6px 14px', background: 'var(--accent-subtle)', color: 'var(--accent)', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600 }}>
                  Brand: {intent.brand}
                </span>
              )}
              {intent.categories.length > 0 && intent.categories.map(c => (
                <span key={c} style={{ padding: '6px 14px', background: 'var(--success-light)', color: 'var(--success)', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600 }}>
                  Category: {c}
                </span>
              ))}
              {intent.maxPrice && (
                <span style={{ padding: '6px 14px', background: 'var(--warning-light)', color: '#B45309', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600 }}>
                  Under ₹{intent.maxPrice.toLocaleString()}
                </span>
              )}
              {intent.color && (
                <span style={{ padding: '6px 14px', background: 'var(--info-light)', color: 'var(--info)', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600 }}>
                  Color: {intent.color}
                </span>
              )}
              {intent.isGift && (
                <span style={{ padding: '6px 14px', background: '#FEF3C7', color: '#92400E', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600 }}>
                  🎁 Gift {intent.giftRecipient ? `for ${intent.giftRecipient}` : ''}
                </span>
              )}
            </div>
          )}

          {/* Manual search fallback */}
          <form onSubmit={handleManualSearch} style={{ display: 'flex', gap: 8, maxWidth: 480, margin: '0 auto 32px' }}>
            <input
              type="text"
              value={manualQuery}
              onChange={(e) => setManualQuery(e.target.value)}
              placeholder='Or type: "Nike shoes under 5000"'
              style={{ flex: 1, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', fontSize: 14, border: '1px solid var(--bg-hover)', fontFamily: 'var(--font-family)', color: 'var(--text-primary)' }}
            />
            <button type="submit" className="btn btn-primary">
              <Search size={16} /> Search
            </button>
          </form>

          {/* Example queries */}
          {state === STATES.IDLE && (
            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12, fontWeight: 600 }}>Try saying:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                {['"Show me Nike shoes"', '"Samsung phone under 50000"', '"Black hoodie"', '"Gift for my brother"', '"Lipstick"', '"Books under 500"'].map((ex, i) => (
                  <button key={i} onClick={() => { setManualQuery(ex.replace(/"/g, '')); setTranscript(ex.replace(/"/g, '')); processQuery(ex.replace(/"/g, '')); }}
                    style={{ padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--bg-hover)', borderRadius: 'var(--radius-full)', fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-family)', transition: 'all 0.2s' }}>
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {state === STATES.RESULTS && results.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 'var(--font-xl)', fontWeight: 700, marginBottom: 20 }}>
              Found {results.length} matching products
            </h2>
            <div className="grid-4">
              {results.slice(0, 12).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {state === STATES.RESULTS && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48 }}>
            <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No products found</h3>
            <p style={{ color: 'var(--text-tertiary)' }}>Try a different brand, category, or price range.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes voiceRing {
          0% { transform: scale(0.8); opacity: 0.4; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
