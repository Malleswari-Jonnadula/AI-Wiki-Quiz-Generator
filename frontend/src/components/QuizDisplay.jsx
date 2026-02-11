import { useState } from 'react';
import QuizCard from './QuizCard';
import TakeQuiz from './TakeQuiz';

export default function QuizDisplay({ data }) {
  const [mode, setMode] = useState('view');

  const btnStyle = (active) => ({
    padding: '8px 20px', borderRadius: 20, cursor: 'pointer',
    fontSize: 14, fontWeight: 600, marginRight: 8,
    background: active ? '#2563eb' : '#eeeff1',
    color: active ? '#fff' : '#374151',
    border: active ? '2px solid #2563eb' : '1px solid #e5e7eb',
  });

  return (
    <div>
      <div style={{ background: '#f8fafc', borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 22, color: '#1e3a5f' }}>{data.title}</h2>
        <p style={{ margin: '0 0 12px', fontSize: 14 }}>
          <a href={data.url} target='_blank' rel='noreferrer' style={{ color: '#3b82f6' }}>{data.url}</a>
        </p>
        <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }}>{data.summary}</p>
      </div>

      {data.sections?.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <b style={{ fontSize: 13, color: '#6b7280' }}>SECTIONS: </b>
          {data.sections.map((s, i) => (
            <span key={i} style={{
              display: 'inline-block', margin: '2px 4px', padding: '3px 10px',
              borderRadius: 20, background: '#e0f2fe', color: '#0369a1', fontSize: 12
            }}>{s}</span>
          ))}
        </div>
      )}

      {data.related_topics?.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <b style={{ fontSize: 13, color: '#6b7280' }}>RELATED TOPICS: </b>
          {data.related_topics.map((t, i) => (
            <a key={i}
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(t)}`}
              target='_blank' rel='noreferrer'
              style={{
                display: 'inline-block', margin: '2px 4px', padding: '3px 10px',
                borderRadius: 20, background: '#fef9c3', color: '#92400e',
                fontSize: 12, textDecoration: 'none'
              }}>{t}</a>
          ))}
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <button style={btnStyle(mode === 'view')} onClick={() => setMode('view')}>View Quiz</button>
        <button style={btnStyle(mode === 'take')} onClick={() => setMode('take')}>Take Quiz</button>
      </div>

      {mode === 'view'
        ? <div>{data.quiz?.map((q, i) => <QuizCard key={i} item={q} />)}</div>
        : <TakeQuiz quiz={data.quiz} />
      }
    </div>
  );
}