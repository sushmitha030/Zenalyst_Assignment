const mongoose = require('mongoose');

const regionRevenueSchema = new mongoose.Schema({
  Region: {
    type: String,
    required: true,
    trim: true
  },
  YearlyRevenue: {
    type: Number,
    default: null,  // handles both numbers and null
    alias: 'Yearly Revenue'
  }
}, {
  collection: 'region revenue analysis'  // To Match the collection I have created
});

module.exports = mongoose.model('RegionRevenueAnalysis', regionRevenueSchema);
