import { useState } from 'react';

export default function TakeQuiz({ quiz }) {
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let s = 0;
    quiz.forEach((q, i) => { if (selected[i] === q.answer) s++; });
    setScore(s);
    setSubmitted(true);
  };

  const reset = () => { setSelected({}); setSubmitted(false); setScore(0); };

  const getStyle = (q, opt, i) => {
    const base = { padding: '8px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 14 };
    if (!submitted) return {
      ...base,
      background: selected[i] === opt ? '#dbeafe' : '#f9fafb',
      border: selected[i] === opt ? '2px solid #3b82f6' : '1px solid #e5e7eb',
      fontWeight: selected[i] === opt ? 600 : 400,
    };
    if (opt === q.answer) return { ...base, background: '#dcfce7', border: '2px solid #22c55e', fontWeight: 600, color: '#15803d' };
    if (selected[i] === opt) return { ...base, background: '#fee2e2', border: '2px solid #ef4444', fontWeight: 600, color: '#991b1b' };
    return { ...base, background: '#f9fafb', border: '1px solid #e5e7eb', color: '#9ca3af' };
  };

  return (
    <div>
      {submitted && (
        <div style={{
          textAlign: 'center', padding: 24, marginBottom: 24,
          background: score >= quiz.length * 0.7 ? '#dcfce7' : '#fef9c3',
          borderRadius: 12, border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: 32, fontWeight: 800 }}>{score}/{quiz.length} correct</div>
          <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
            {score >= quiz.length * 0.7 ? '🎉 Great job!' : '📚 Keep practicing!'}
          </div>
          <button onClick={reset} style={{
            marginTop: 12, padding: '8px 24px', background: '#3b82f6',
            color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14
          }}>Try Again</button>
        </div>
      )}

      {quiz.map((q, i) => (
        <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, marginBottom: 16, background: '#fff' }}>
          <p style={{ fontWeight: 600, margin: '0 0 12px' }}>{i + 1}. {q.question}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {q.options.map((opt, j) => (
              <div key={j} style={getStyle(q, opt, i)}
                onClick={() => !submitted && setSelected(s => ({ ...s, [i]: opt }))}>
                {String.fromCharCode(65 + j)}. {opt}
              </div>
            ))}
          </div>
          {submitted && (
            <div style={{ marginTop: 10, padding: '6px 10px', borderRadius: 6, background: '#f0f9ff', fontSize: 13 }}>
              <b>Explanation:</b> {q.explanation}
            </div>
          )}
        </div>
      ))}

      {!submitted && Object.keys(selected).length === quiz.length && (
        <button onClick={handleSubmit} style={{
          display: 'block', margin: '0 auto', padding: '12px 40px',
          background: '#2563eb', color: '#fff', border: 'none',
          borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: 'pointer'
        }}>Submit Quiz</button>
      )}
    </div>
  );
}