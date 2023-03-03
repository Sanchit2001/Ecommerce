module.exports = returnError=>(req,res,next)=>{
    Promise.resolve(returnError(req,res,next)).catch(next);
};