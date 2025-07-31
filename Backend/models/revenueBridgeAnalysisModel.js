const mongoose = require('mongoose');

const revenueBridgeSchema = new mongoose.Schema({
  CustomerName: {
    type: String,
    required: true,
    alias: 'Customer Name' // Used alias to map to the spaced field in MongoDb
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
  ChurnedRevenue: {
    type: Number,
    required: true,
    alias: 'Churned Revenue'
  },
  NewRevenue: {
    type: Number,
    required: true,
    alias: 'New Revenue'
  },
  ExpansionRevenue: {
    type: Number,
    required: true,
    alias: 'Expansion Revenue'
  },
  ContractionRevenue: {
    type: Number,
    required: true,
    alias: 'Contraction Revenue'
  }
}, {
  collection: 'revenue_bridge_analysis'
});

module.exports = mongoose.model('RevenueBridgeAnalysis', revenueBridgeSchema);
