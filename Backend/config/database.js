const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const dbURI = process.env.DB_CONNECTION_STRING;

    const dbConnection = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ Connected to MongoDB at: ${dbConnection.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDatabase;

