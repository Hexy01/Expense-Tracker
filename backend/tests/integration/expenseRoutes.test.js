const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Expense = require('../../models/Expense');

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

describe('Expense Model Integration', () => {
  it('should save and retrieve an expense from the database', async () => {
    const expense = await Expense.create({
      title: 'Bus',
      amount: 50,
      category: 'Transport',
      date: new Date()
    });

    const found = await Expense.findById(expense._id);
    expect(found.title).toBe('Bus');
    expect(found.amount).toBe(50);
  });

  it('should delete an expense', async () => {
    const exp = await Expense.create({
      title: 'DeleteMe',
      amount: 100,
      category: 'Other',
      date: new Date()
    });

    await Expense.findByIdAndDelete(exp._id);
    const result = await Expense.findById(exp._id);
    expect(result).toBeNull();
  });
});
