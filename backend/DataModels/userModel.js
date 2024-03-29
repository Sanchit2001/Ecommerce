const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please Enter Your Name"],
        maxLength:[30,"Cannot Excced more tha 30 characters"],
        minLength:[4,"Cannot Be less than 4 characters"]
    },
    email:{
        type:String,
        required: [true,"Enter Email!"],
        unique:true,
        validate:[validator.isEmail,"Invalid EmailID"]
    },
    contact:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please Enter valid Password"],
        minLength:[8,"Shuld be atleast 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){ next();}
    this.password =await bcrypt.hash(this.password,10);

})

//JWT Tokens
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.getResetPasswordToken = async function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now()+15*60*1000;

    return resetToken;
}

module.exports = mongoose.model("User",userSchema);