import { useEffect, useState } from 'react';
import { getHistory, getQuizById } from '../api';
import HistoryTable from '../components/HistoryTable';
import Modal from '../components/Modal';

export default function HistoryTab() {
  const [history, setHistory] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory()
      .then(res => { setHistory(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDetails = async (id) => {
    const res = await getQuizById(id);
    setModalData(res.data);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: '0 0 4px', color: '#1e3a5f' }}>Quiz History</h2>
        <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>
          All previously generated quizzes. Click Details to view the full quiz.
        </p>
      </div>

      {loading
        ? <p style={{ color: '#9ca3af', textAlign: 'center', padding: 40 }}>Loading...</p>
        : <HistoryTable history={history} onDetails={handleDetails} />
      }

      <Modal data={modalData} onClose={() => setModalData(null)} />
    </div>
  );
}