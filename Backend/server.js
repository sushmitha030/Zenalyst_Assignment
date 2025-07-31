require('dotenv').config()

const connectToDatabase = require('./config/database')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');
app.use(cors());

connectToDatabase();

const serviceRoute = require('./routes/route');

app.use(bodyParser.json());

app.use("/api", serviceRoute);

const PORT = 8081;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});