const express = require('express');
const router = express.Router();
const { getTopCountriesByRevenue } = require('../controllers/countriesRevenueController');
const { getCustomerGrowthAnalysis } = require('../controllers/customerGrowthAnalysisController');

router.get('/top-countries-by-revenue', getTopCountriesByRevenue);

router.get('/get-customer-growth-analysis', getCustomerGrowthAnalysis);

module.exports = router;