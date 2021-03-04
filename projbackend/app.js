require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
//my routes

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const stripeRoutes = require('./routes/stripe');
const paymentBRoutes = require('./routes/paymentBRoutes');

//Middle wares
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', stripeRoutes);
app.use('/api', paymentBRoutes);

//DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB IS CONNECTED');
  });

//port  and starting a server
app.listen(process.env.PORT || 8000, () => {
  console.log(`app is running  and portno: ${process.env.PORT}`);
});
