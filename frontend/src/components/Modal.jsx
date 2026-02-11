import QuizDisplay from './QuizDisplay';

export default function Modal({ data, onClose }) {
  if (!data) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      zIndex: 999, display: 'flex', alignItems: 'flex-start',
      justifyContent: 'center', padding: '40px 16px', overflowY: 'auto',
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 16, width: '100%',
        maxWidth: 820, padding: 32, position: 'relative',
        maxHeight: '90vh', overflowY: 'auto',
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16,
          background: '#f3f4f6', border: 'none', borderRadius: '50%',
          width: 32, height: 32, cursor: 'pointer', fontSize: 16,
        }}>✕</button>
        <QuizDisplay data={data} />
      </div>
    </div>
  );
}