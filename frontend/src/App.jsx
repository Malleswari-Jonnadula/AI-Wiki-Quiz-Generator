import { useState } from 'react';
import GenerateTab from './pages/GenerateTab';
import HistoryTab from './pages/HistoryTab';
import './App.css';

function App() {
  const [tab, setTab] = useState('generate');

  const tabStyle = (active) => ({
    padding: '18px 28px', fontSize: 15, fontWeight: 600,
    cursor: 'pointer', border: 'none', background: 'transparent',
    color: active ? '#60a5fa' : '#94a3b8',
    borderBottom: active ? '3px solid #60a5fa' : '3px solid transparent',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <header style={{
        background: '#1e3a5f', padding: '0 32px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}>
        <div style={{ padding: '16px 0' }}>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>🧠 WikiQuiz</span>
          <span style={{ color: '#93c5fd', fontSize: 13, marginLeft: 10 }}>
            AI-powered quiz generator
          </span>
        </div>
        <nav style={{ display: 'flex' }}>
          <button style={tabStyle(tab === 'generate')} onClick={() => setTab('generate')}>
            Generate Quiz
          </button>
          <button style={tabStyle(tab === 'history')} onClick={() => setTab('history')}>
            History
          </button>
        </nav>
      </header>

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '32px 16px' }}>
        {tab === 'generate' ? <GenerateTab /> : <HistoryTab />}
      </main>
    </div>
  );
}

export default App;