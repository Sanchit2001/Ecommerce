const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require('cloudinary')
const connectDB = require("./config/database");
//Uncaught Exception
process.on("uncaughtException",err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down due to Uncaught Exception`);
    process.exit(1);
})

dotenv.config({path:"backend/config/config.env"});

connectDB();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT,()=>{
    console.log(`Running on http://localhost:${process.env.PORT}`)
});

//Unhandled Promise Errors
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down server due to Unhandled Promise`);
    server.close(()=>{
        process.exit(1);
    });
});