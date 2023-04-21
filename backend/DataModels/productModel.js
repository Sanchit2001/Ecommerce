const mongoose = require("mongoose");

const productSchemna =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"]
    },
    description:{
        type:String,
        required:[true,"Please Enter Product description"]
    },
    oldPrice:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxLength:[8,"Price less than 99999999"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxLength:[8,"Price less than 99999999"]
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Catagory"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Quantity"],
        maxLength:[4,"Cannot be more than 99999"],
        default:1
    },
    noOfReviews:{
        type:Number,
        default:0
    },
    
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    avgRating:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
     
});

module.exports = mongoose.model("Product",productSchemna);