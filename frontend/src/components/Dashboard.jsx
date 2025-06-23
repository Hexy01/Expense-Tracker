import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer
} from 'recharts';

export default function Dashboard({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const categoryData = Object.values(
    expenses.reduce((acc, { category, amount }) => {
      acc[category] = acc[category] || { name: category, value: 0 };
      acc[category].value += Number(amount);
      return acc;
    }, {})
  );

  const COLORS = ['#00c6ad', '#ffc947', '#f25f5c', '#845ec2', '#2c73d2', '#0089ba'];

  return (
    <div style={styles.dashboard}>
      <h3 style={styles.total}>Total Spending: ₹{total}</h3>

      <div style={styles.chartWrapper}>
        <div style={styles.chartCard}>
          <h4 style={styles.chartTitle}>Pie Chart</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                outerRadius={80}
                label
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartCard}>
          <h4 style={styles.chartTitle}>Bar Chart</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00c6ad" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    textAlign: 'center',
  },
  total: {
    color: '#ffc947',
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
  },
  chartWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  chartCard: {
  backgroundColor: '#2a2a2a',
  padding: '1rem',
  borderRadius: '1rem',
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  minWidth: 0, // prevents overflow
  overflow: 'hidden' // hides anything outside bounds
},
  chartTitle: {
    marginBottom: '0.5rem',
    color: '#00c6ad',
    fontWeight: '600',
  }
};
