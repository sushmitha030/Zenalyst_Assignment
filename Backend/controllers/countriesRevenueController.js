const CountryRevenue = require('../models/countryRevenueModel');

// GET /api/top-countries-by-revenue?n=5
exports.getTopCountriesByRevenue = async (req, res) => {
  try {
    let n;

    if (req.query.n === undefined) {
      n = 20; // Default value if no query param is sent
    } else {
      n = parseInt(req.query.n);
      if (isNaN(n) || n <= 0) {
        return res.status(400).json({
          message: 'Query parameter "n" must be a positive number.'
        });
      }
    }

    const topCountries = await CountryRevenue.find({}, { _id: 0 }) // Exclude _id field in DB here
      .sort({ 'Yearly Revenue': -1 }) // Explicitly defining the field as alias way was not working
      .limit(n);

    return res.status(200).json(topCountries);
  } catch (error) {
    console.error('Error: Failed to fetch top countries by revenue: ', error);
    return res.status(500).json({
      message: `Internal Server Error: ${error.message}`
    });
  }
};

