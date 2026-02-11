import { useState } from 'react';
import GenerateTab from './pages/GenerateTab';
import HistoryTab from './pages/HistoryTab';
import './App.css';

function App() {
  const [tab, setTab] = useState('generate');

  const tabButton = (active) => ({
    padding: '10px 22px',
    borderRadius: '999px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    background: active ? '#3b82f6' : 'transparent',
    color: active ? '#fff' : '#cbd5e1',
    transition: 'all 0.25s ease',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      
      {/* HEADER */}
      <header
        style={{
          background: '#1e293b',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        {/* Centered Container */}
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Title - 2 Lines */}
          <div>
            <div
              style={{
                color: '#fff',
                fontSize: 22,
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              🧠 WikiQuiz
            </div>
            <div
              style={{
                color: '#94a3b8',
                fontSize: 14,
                marginTop: 4,
              }}
            >
              AI-powered quiz generator
            </div>
          </div>

          {/* Tabs */}
          <div
            style={{
              background: '#334155',
              padding: '5px',
              borderRadius: '999px',
              display: 'flex',
              gap: '6px',
            }}
          >
            <button
              style={tabButton(tab === 'generate')}
              onClick={() => setTab('generate')}
            >
              Quiz
            </button>

            <button
              style={tabButton(tab === 'history')}
              onClick={() => setTab('history')}
            >
              History
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px' }}>
        {tab === 'generate' ? <GenerateTab /> : <HistoryTab />}
      </main>
    </div>
  );
}

export default App;
