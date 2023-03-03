const ErrorHandler = require('../utils/errorHandler')

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message ||"Internal Server Error";

    //MOongoDB Error
    if(err.name==="CastError"){
        const message = `Resource not found or invalid id:${err.path}`;
        err = new ErrorHandler(message,400);
    }

    if(err.code===11000){
        const message = `${Object.keys(err.keyValue)} already exists`;
        err = new ErrorHandler(message,400);
    }
    if(err.name==="JsonWebTokenErron"){
        const message = `Invalid Web Token, Try Again`;
        err = new ErrorHandler(message,400);
    }

    if(err.name==="TokenExpiredError"){
        const message = `Token Already Expired, Try Again`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })  
}