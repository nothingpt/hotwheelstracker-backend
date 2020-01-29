const mongoose = require('mongoose');

require("dotenv").config();

const connectionString = `mongodb+srv://${process.env.USERLOGIN}:${process.env.USERPASS}@cluster0-ktixb.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

const db = mongoose.connect(connectionString);

module.exports = db;
