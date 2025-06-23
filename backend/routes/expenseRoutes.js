const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// CREATE
router.post('/', async (req, res) => {
  const expense = await Expense.create(req.body);
  res.status(201).json(expense);
});

// READ with filters
router.get('/', async (req, res) => {
  const { category, startDate, endDate } = req.query;
  let filter = {};
  if (category) filter.category = category;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }
  const expenses = await Expense.find(filter);
  res.json(expenses);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
