import { useEffect, useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FilterBar from './components/FilterBar';
import Dashboard from './components/Dashboard';
import { getExpenses } from './utils/api';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: '', startDate: '', endDate: '' });

  const fetchExpenses = async () => {
    const res = await getExpenses(filters);
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>💸 Personal Expense Tracker</h1>
        <div style={styles.card}>
          <ExpenseForm onAdd={fetchExpenses} />
        </div>
        <div style={styles.card}>
          <FilterBar filters={filters} setFilters={setFilters} />
        </div>
        <div style={styles.card}>
          <Dashboard expenses={expenses} />
        </div>
        <div style={styles.card}>
          <ExpenseList expenses={expenses} onChange={fetchExpenses} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
  backgroundColor: '#1e1e1e',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  padding: '2rem 1rem',
  color: '#fff',
  boxSizing: 'border-box',
  width: '100%',
  overflowX: 'hidden'
},
container: {
  width: '100%',
  maxWidth: '900px'
},
  heading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '4 rem',
    color: '#00c6ad',
  },
  card: {
    backgroundColor: '#2a2a2a',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0, 198, 173, 0.2)',
  }
};
