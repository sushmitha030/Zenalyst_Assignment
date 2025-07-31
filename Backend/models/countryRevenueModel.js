const mongoose = require('mongoose');

const countryRevenueSchema = new mongoose.Schema({
  Country: {
    type: String,
    required: true,
    trim: true
  },
  YearlyRevenue: {
    type: Number,
    required: true,
    alias: 'Yearly Revenue'
  }
},{
  collection: 'country_revenue_analysis'  // To Match the collection I have created
});

module.exports = mongoose.model('CountryRevenue', countryRevenueSchema);
