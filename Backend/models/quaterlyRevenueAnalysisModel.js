const mongoose = require('mongoose');

const quarterlyRevenueSchema = new mongoose.Schema({
  CustomerName: {
    type: String,
    required: true,
    alias: 'Customer Name'
  },
  Quarter3Revenue: {
    type: Number,
    required: true,
    alias: 'Quarter 3 Revenue'
  },
  Quarter4Revenue: {
    type: Number,
    required: true,
    alias: 'Quarter 4 Revenue'
  },
  Variance: {
    type: Number,
    required: true
  },
  PercentageOfVariance: {
    type: Number,
    default: null,
    alias: 'Percentage of Variance'
  }
}, {
  collection: 'quarterly_revenue_data'  // To Match the collection I have created
});

module.exports = mongoose.model('QuarterlyRevenueData', quarterlyRevenueSchema);
