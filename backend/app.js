const express = require('express');
const errorMiddleware = require('./middleware/error');
const asyncErrors = require('./middleware/asyncErrors');
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
//Route Imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute")
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use(errorMiddleware);
app.use(asyncErrors);
module.exports = app;