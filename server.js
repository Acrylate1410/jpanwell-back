require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
//const { createServer } = require('node:http');
const routes1 = require('./routes/products');
const routes2 = require('./routes/articles');
const app = express()
//const GridFsStorage = require('multer-gridfs-storage')
//const Grid = require('gridfs-stream')
//const methodOverride = require('method-override')
//app.use(methodOverride('_method'));
//const { Server } = require('socket.io');
//const server = createServer(app);
//const io = new Server(server);
const cors = (req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type");

  next();
};
app.use(cors)
app.use('/products', routes1)
app.use('/articles', routes2)
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