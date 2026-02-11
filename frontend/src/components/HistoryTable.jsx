export default function HistoryTable({ history, onDetails }) {
  if (!history.length) return (
    <p style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>
      No quizzes yet. Go to Tab 1 to generate your first quiz!
    </p>
  );

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: '#1e3a5f' }}>
            {['#', 'Title', 'URL', 'Generated At', 'Action'].map(h => (
              <th key={h} style={{ padding: '12px 16px', color: '#fff', textAlign: 'left' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {history.map((item, i) => (
            <tr key={item.id} style={{ background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
              <td style={{ padding: '10px 16px', color: '#9ca3af' }}>{i + 1}</td>
              <td style={{ padding: '10px 16px', fontWeight: 600, color: '#1e3a5f' }}>{item.title}</td>
              <td style={{ padding: '10px 16px' }}>
                <a href={item.url} target='_blank' rel='noreferrer'
                  style={{ color: '#3b82f6', textDecoration: 'none', fontSize: 12 }}>
                  {item.url.length > 45 ? item.url.slice(0, 45) + '...' : item.url}
                </a>
              </td>
              <td style={{ padding: '10px 16px', color: '#6b7280', fontSize: 12 }}>
                {new Date(item.created_at).toLocaleString()}
              </td>
              <td style={{ padding: '10px 16px' }}>
                <button onClick={() => onDetails(item.id)} style={{
                  padding: '6px 14px', background: '#2563eb', color: '#fff',
                  border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13
                }}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}