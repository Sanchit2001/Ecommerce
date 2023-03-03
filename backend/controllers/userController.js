const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middleware/asyncErrors');
const User = require('../DataModels/userModel');
const sendTokens = require('../utils/jwtTokens');
const sendEmail = require('../utils/sendEmail');
const Product = require('../DataModels/productModel')
exports.registerUser = asyncErrors(async (req,res,next)=>{
    const {name,email,password}= req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is temp id",
            url:"sampleURL"
        }
    });

    sendTokens(user,201,res);
});

//login
exports.loginUser = asyncErrors(async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",400));
    }

    const user =await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Please Enter Valid Email and Password",401));
    }
    const isPasswordCorrect =await user.comparePassword(password);
    console.log(isPasswordCorrect);
    if(!isPasswordCorrect){
        return next(new ErrorHandler("Please Enter Valid Email and Password",401));
    }

    sendTokens(user,200,res);
});

exports.logout = asyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged out"
    });
});


exports.forgotPassword = asyncErrors(async (req,res,next)=>{
    const user = User.findOne({email:req.body.email});
    if(!user){
        return next(
            new ErrorHandler("User Not Found",404)
        );
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforSave:false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your Password reset token is:- \n\n ${resetPasswordUrl}
     \n\nIf you have not requested this email then please Ignore it `;

     try {
        await sendEmail({
            email:user.email,
            subject:"password reset request",
            message,
        });
        res.status(200).json({
            success:true,
            message:"Email sent successfully"
        });
     } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforSave:false});
        return next(new ErrorHandler(error.message,500));
     }
});

exports.resetPassword = asyncErrors(async(req,res,next)=>{
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(req,)
        .digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now() }
    });
    if(!user){
        return next(new ErrorHandler("Reset Token Invalid",400));
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Passwords Dosen't match",400));
    }
    user.password = req.body.password;
    user.resetPasswordExpire=undefined;
    user.resetPasswordToken=undefined;
    await user.save();
    sendTokens(user,200,res);
});

//user Routes for users
exports.getUserDetails = asyncErrors(async(req,res,next)=>{
    const user =await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    });
});

exports.updatePassword = asyncErrors(async(req,res,next)=>{
    const user =await User.findById(req.user.id).select("+password");
    const isPasswordMatched =await user.comparePassword(req.body.oldPassword);
    console.log(isPasswordMatched);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Incorrect Password",400));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
        success:true,
        user
    });
});

exports.updateProfile = asyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
    
    const user =await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        user
    });
});

//user routes for admin
exports.getAllUsers = asyncErrors(async(req,res,next)=>{
    const users =await User.find();
    res.status(200).json({
        success:true,
        users
    });
});

exports.getSingleUser = asyncErrors(async(req,res,next)=>{
    const user =await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User with ${req.params.id} does not exist`,400));
    }
    
    res.status(200).json({
        success:true,
        user
    });
});

exports.updateUserRole = asyncErrors(async(req,res,next)=>{
    var newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    console.log(newUserData)
    const user =await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        user
    });
});

exports.deleteUser  = asyncErrors(async(req,res,next)=>{
    const user =await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler("User Not Found",400));
    }
    user.remove();
    res.status(200).json({
        success:true,
    });
});


