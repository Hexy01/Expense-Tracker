const express = require('express');
const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Expense = require('../../models/Expense');
const expenseRoutes = require('../../routes/expenseRoutes');

const app = express();
app.use(express.json());
app.use('/api/expenses', expenseRoutes);

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

afterEach(async () => {
  await Expense.deleteMany();
});

describe('API /api/expenses', () => {
  it('POST creates a new expense', async () => {
    const res = await request(app).post('/api/expenses').send({
      title: 'Chai',
      amount: 20,
      category: 'Food',
      date: new Date()
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Chai');
  });

  it('GET returns expenses', async () => {
    await Expense.create({ title: 'X', amount: 10, category: 'Other', date: new Date() });

    const res = await request(app).get('/api/expenses');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('DELETE removes an expense', async () => {
    const exp = await Expense.create({ title: 'Temp', amount: 5, category: 'Temp', date: new Date() });
    const res = await request(app).delete(`/api/expenses/${exp._id}`);
    expect(res.statusCode).toBe(204);
  });

  it('GET supports category filter', async () => {
    await Expense.create({ title: 'Bike', amount: 70, category: 'Transport', date: new Date() });
    const res = await request(app).get('/api/expenses?category=Transport');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].category).toBe('Transport');
  });

  // ✅ Filter by startDate only
  it('GET supports startDate filter only', async () => {
    const oldDate = new Date('2023-01-01');
    const recentDate = new Date('2025-01-01');

    await Expense.create({ title: 'Old', amount: 100, category: 'A', date: oldDate });
    await Expense.create({ title: 'New', amount: 200, category: 'A', date: recentDate });

    const res = await request(app).get('/api/expenses?startDate=2024-01-01');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('New');
  });

  // ✅ Filter by endDate only
  it('GET supports endDate filter only', async () => {
    const oldDate = new Date('2023-01-01');
    const recentDate = new Date('2025-01-01');

    await Expense.create({ title: 'Old', amount: 100, category: 'B', date: oldDate });
    await Expense.create({ title: 'New', amount: 200, category: 'B', date: recentDate });

    const res = await request(app).get('/api/expenses?endDate=2024-01-01');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Old');
  });

  // ✅ Filter by both startDate and endDate
  it('GET supports both startDate and endDate filters', async () => {
    const dates = [
      new Date('2023-01-01'),
      new Date('2024-06-01'),
      new Date('2025-01-01'),
    ];

    await Expense.create({ title: 'Old', amount: 100, category: 'C', date: dates[0] });
    await Expense.create({ title: 'Mid', amount: 200, category: 'C', date: dates[1] });
    await Expense.create({ title: 'New', amount: 300, category: 'C', date: dates[2] });

    const res = await request(app).get('/api/expenses?startDate=2024-01-01&endDate=2024-12-31');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Mid');
  });
});
