import { useState } from 'react';
import { addExpense } from '../utils/api';

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({ title: '', amount: '', category: '', date: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense(form);
    setForm({ title: '', amount: '', category: '', date: '' });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        placeholder="Title"
        value={form.title}
        required
        onChange={e => setForm({ ...form, title: e.target.value })}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        required
        onChange={e => setForm({ ...form, amount: e.target.value })}
        style={styles.input}
      />
      <input
        type="date"
        value={form.date}
        required
        onChange={e => setForm({ ...form, date: e.target.value })}
        style={styles.input}
      />
      <select
  value={form.category}
  required
  onChange={e => setForm({ ...form, category: e.target.value })}
  style={styles.input}
>
  <option value="">Select Category</option>
  <option value="Food">Food</option>
  <option value="Transport">Transport</option>
  <option value="Groceries">Groceries</option>
  <option value="Bills">Bills</option>
  <option value="Shopping">Shopping</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Health">Health</option>
  <option value="Other">Other</option>
</select>
      <button type="submit" style={styles.button}>Add</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid #555',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    minWidth: '120px',
    flexGrow: 1,
  },
  button: {
    padding: '0.5rem 1.5rem',
    backgroundColor: '#00c6ad',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};
