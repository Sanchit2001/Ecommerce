const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
//Uncaught Exception
process.on("uncaughtException",err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down due to Uncaught Exception`);
    server.close(()=>{
        process.exit(1);
    })
})

dotenv.config({path:"backend/config/config.env"});

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Running on htpp://localhost:${process.env.PORT}`)
});

//Unhandled Promise Errors
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down server due to Unhandled Promise`);
    server.close(()=>{
        process.exit(1);
    });
});