const QuarterlyRevenueData = require('../models/quaterlyRevenueAnalysisModel'); 

exports.getCustomerGrowthAnalysis = async (req, res) => {
  try {
    const minQ4 = parseFloat(req.query.minQ4Revenue);
    const onlyPositive = req.query.onlyPositiveGrowth === 'true';

    const filter = {};

    if (minQ4 != undefined && !isNaN(minQ4)) {
      filter["Quarter 4 Revenue"] = { $gte: minQ4 }; // Using explicit naming here
    }

    if (onlyPositive != undefined && onlyPositive) {
      filter.Variance = { $gt: 0 };
    }

    const customerGrowthAnalysisResults = await QuarterlyRevenueData.find(filter, { _id: 0 }).lean({ virtuals: true });

    return res.status(200).json(customerGrowthAnalysisResults);
  } catch (error) {
    console.error('Error: Fetching customer growth data:', error);
    return res.status(500).json({ message: `Internal Server Error ${error.message}` });
  }
};