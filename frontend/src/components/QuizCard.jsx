export default function QuizCard({ item }) {
  const diffColor = {
    easy: '#22c55e',
    medium: '#f59e0b',
    hard: '#ef4444'
  };

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      background: '#fff',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <p style={{ fontWeight: 600, fontSize: 15, flex: 1, margin: 0 }}>{item.question}</p>
        <span style={{
          marginLeft: 12, padding: '2px 10px', borderRadius: 20,
          fontSize: 11, fontWeight: 700, color: '#fff',
          background: diffColor[item.difficulty] || '#6b7280',
          textTransform: 'uppercase', whiteSpace: 'nowrap'
        }}>{item.difficulty}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
        {item.options.map((opt, i) => (
          <div key={i} style={{
            padding: '8px 12px', borderRadius: 8, fontSize: 14,
            background: opt === item.answer ? '#dcfce7' : '#f9fafb',
            border: opt === item.answer ? '1.5px solid #22c55e' : '1px solid #e5e7eb',
            fontWeight: opt === item.answer ? 600 : 400,
            color: opt === item.answer ? '#15803d' : '#374151',
          }}>
            {String.fromCharCode(65 + i)}. {opt}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 12, padding: '8px 12px', borderRadius: 8,
        background: '#f0f9ff', border: '1px solid #bae6fd', fontSize: 13,
      }}>
        <span style={{ fontWeight: 600, color: '#0369a1' }}>Explanation: </span>
        <span style={{ color: '#374151' }}>{item.explanation}</span>
      </div>
    </div>
  );
}