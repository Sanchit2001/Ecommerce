const express = require('express');
const errorMiddleware = require('./middleware/error');
const asyncErrors = require('./middleware/asyncErrors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const app = express();
const dotenv = require("dotenv");
dotenv.config({path:"backend/config/config.env"});
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
//Route Imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoutes")
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);
app.use(errorMiddleware);
app.use(asyncErrors);
module.exports = app;