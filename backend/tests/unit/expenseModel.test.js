const Expense = require('../../models/Expense');

describe('Expense Model', () => {
  it('should have default timestamps and required fields', () => {
    const expense = new Expense({
      title: 'Test',
      amount: 100,
      category: 'Food',
      date: new Date()
    });

    expect(expense.title).toBe('Test');
    expect(expense.amount).toBe(100);
    expect(expense.category).toBe('Food');
  });
});
