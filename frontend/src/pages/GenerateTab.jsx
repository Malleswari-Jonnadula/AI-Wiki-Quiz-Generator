import { useState } from 'react';
import { generateQuiz, previewUrl } from '../api';
import QuizDisplay from '../components/QuizDisplay';

export default function GenerateTab() {
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePreview = async (val) => {
    const u = val || url;
    if (!u.includes('wikipedia.org/wiki/')) return;
    try {
      const res = await previewUrl(u);
      setPreview(res.data);
    } catch {
      setPreview(null);
    }
  };

  const handleGenerate = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setQuiz(null);
    try {
      const res = await generateQuiz(url.trim());
      setQuiz(res.data);
    } catch (e) {
      setError(e.response?.data?.detail || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ background: '#f8fafc', borderRadius: 16, padding: 24, marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 8px', color: '#1e3a5f' }}>Generate Quiz from Wikipedia</h2>
        <p style={{ margin: '0 0 16px', color: '#6b7280', fontSize: 14 }}>
          Paste any Wikipedia article URL to generate an AI-powered quiz.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input
            value={url}
            onChange={e => { setUrl(e.target.value); setPreview(null); }}
            onBlur={() => handlePreview()}
            placeholder='https://en.wikipedia.org/wiki/Alan_Turing'
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: 12,
              fontSize: 15,
              border: '1.5px solid #d1d5db',
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleGenerate}
            disabled={loading || !url}
            style={{
        padding: '12px 36px',
        borderRadius: 12,
        background: loading ? '#93c5fd' : '#2563eb',
        color: '#fff',
        border: 'none',
        cursor: loading ? 'wait' : 'pointer',
        fontSize: 18,
        fontWeight: 700,
        minWidth: 200,
        transition: 'all 0.2s ease',
      }}
          >
            {loading ? 'Generating...' : 'Generate Quiz'}
          </button>
        </div>
        </div>

        {preview && (
          <div style={{ marginTop: 10, fontSize: 13, color: '#059669' }}>
            ✅ Found: <b>{preview.title}</b>
          </div>
        )}
        {error && <p style={{ color: '#dc2626', marginTop: 10, fontSize: 14 }}>❌ {error}</p>}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px 0',  marginTop: 10,color: '#6b7280' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>⚙️</div>
          <p style={{ fontWeight: 600 }}>Generating quiz with AI...</p>
          <p style={{ fontSize: 13 }}>This takes about 15-20 seconds. Please wait!</p>
        </div>
      )}

      {quiz && <QuizDisplay data={quiz} />}
    </div>
  );
}