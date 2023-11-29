require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const routes1 = require('./routes/products');
const routes2 = require('./routes/articles');
const routes3 = require('./routes/messages');
const app = express()
const cors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
  next();
};
app.use(cors)
app.use('/products', routes1)
app.use('/articles', routes2)
app.use('/messages', routes3)
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error);
})
database.once('open', () => {
  console.log('Database Connected');
})
const port = 8080
app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})