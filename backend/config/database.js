const mongoose = require("mongoose")

const connectDB = ()=>{
    mongoose.set('strictQuery',true);
    mongoose.connect("mongodb://127.0.0.1:27017/ganadharAyuCare").then((data)=>{
    console.log(`Connected To Server:${data.connection.host}`)
    });
    
}

module.exports = connectDB;
