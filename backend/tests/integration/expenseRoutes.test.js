const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const Expense = require('../../models/Expense');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Expense.deleteMany();
});

describe('POST /api/expenses', () => {
  it('creates a new expense', async () => {
    const res = await request(app)
      .post('/api/expenses')
      .send({ title: 'Test Expense', amount: 50, category: 'Food', date: new Date() });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Expense');
  });
});

describe('GET /api/expenses', () => {
  it('fetches all expenses', async () => {
    await Expense.create({ title: 'Lunch', amount: 30, category: 'Food', date: new Date() });
    const res = await request(app).get('/api/expenses');
    expect(res.body.length).toBeGreaterThan(0);
  });
});
