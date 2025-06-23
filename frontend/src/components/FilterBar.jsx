export default function FilterBar({ filters, setFilters }) {
  return (
    <div style={styles.filterBar}>
      <input
        placeholder="Category"
        value={filters.category}
        onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
        style={styles.input}
      />
      <input
        type="date"
        value={filters.startDate}
        onChange={e => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
        style={styles.input}
      />
      <input
        type="date"
        value={filters.endDate}
        onChange={e => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
        style={styles.input}
      />
      <button
        onClick={() => setFilters({ category: '', startDate: '', endDate: '' })}
        style={styles.button}
      >
        Clear
      </button>
    </div>
  );
}

const styles = {
  filterBar: {
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
    backgroundColor: '#f25f5c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};
