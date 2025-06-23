import { deleteExpense } from '../utils/api';

export default function ExpenseList({ expenses, onChange }) {
  if (expenses.length === 0) {
    return <p style={styles.noData}>No expenses found for the selected filters.</p>;
  }

  return (
    <div style={styles.listContainer}>
      {expenses.map(e => (
        <div key={e._id} style={styles.item}>
          <div>
            <strong style={styles.title}>{e.title}</strong><br />
            <span style={styles.detail}>₹{e.amount} • {e.category} • {new Date(e.date).toLocaleDateString()}</span>
          </div>
          <button onClick={async () => {
            await deleteExpense(e._id);
            onChange();
          }} style={styles.deleteButton}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  item: {
    backgroundColor: '#1e1e1e',
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(255,255,255,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.1rem',
    color: '#ffc947',
  },
  detail: {
    fontSize: '0.9rem',
    color: '#ccc',
  },
  deleteButton: {
    backgroundColor: '#f25f5c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  noData: {
    textAlign: 'center',
    color: '#aaa',
    fontStyle: 'italic',
  }
};
