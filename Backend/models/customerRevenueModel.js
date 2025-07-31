const mongoose = require('mongoose');

const customerRevenueSchema = new mongoose.Schema({
  CustomerName: {
    type: String,
    required: true,
    trim: true,
    alias: 'Customer Name'
  },
  TotalRevenue: {
    type: Number,
    required: true,
    alias: 'Total Revenue'
  }
}, {
  collection: 'customer_revenue_analysis' // To Match the collection I have created
});

module.exports = mongoose.model('CustomerRevenue', customerRevenueSchema);
