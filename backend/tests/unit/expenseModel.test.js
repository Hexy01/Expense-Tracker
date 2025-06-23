const Expense = require('../../models/Expense');

describe('Expense Model', () => {
  it('should create a valid expense object', () => {
    const data = {
      title: 'Milk',
      amount: 40,
      category: 'Groceries',
      date: new Date()
    };
    const expense = new Expense(data);
    expect(expense.title).toBe('Milk');
    expect(expense.amount).toBe(40);
    expect(expense.category).toBe('Groceries');
    expect(expense.date).toBeInstanceOf(Date);
  });

  it('should require title and amount', async () => {
    const expense = new Expense({});
    try {
      await expense.validate();
    } catch (err) {
      expect(err.errors).toBeDefined();
    }
  });
});
