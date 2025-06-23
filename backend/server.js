require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    app.use('/api/expenses', require('./routes/expenseRoutes'));
    app.listen(PORT, () => {
      console.log(`🚀 Server running at: http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('DB connection error:', err));
