const Expense = require('../models/Expense');

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  const { category, startDate, endDate } = req.query;

  let query = {};
  if (category) query.category = category;
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const expenses = await Expense.find(query).sort({ date: -1 });
  res.json(expenses);
};

// Create a new expense
exports.createExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  const expense = new Expense({ title, amount, category, date });
  await expense.save();
  res.status(201).json(expense);
};

// Update an expense
exports.updateExpense = async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
