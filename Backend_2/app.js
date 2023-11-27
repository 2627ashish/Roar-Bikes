//this is the file where we will b writing express application code
const express = require('express');
const mongoose = require('mongoose');
const router = require('./Router/index');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 9992;
// const port=process.env.PORT || 8080;
// const hostname = '0.0.0.0';
const hostname = 'localhost';
const serverDB = 'mongodb+srv://bike_29:fNBZ8Fo3JpZGPC40@cluster0.syyqr.mongodb.net/bike_29?retryWrites=true&w=majority'
const app = express();
app.use(cors());
app.use(express.json()); //parse the json objects
app.use('/', router);
mongoose.connect(serverDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        app.listen(port,hostname,() => {
            console.log(`Server is running at ${hostname}:${port}`);
        });
    })
    .catch(err => console.log(err));