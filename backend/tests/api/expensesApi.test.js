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
});
