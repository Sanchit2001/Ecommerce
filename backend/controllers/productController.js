const Product = require("../DataModels/productModel");
const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middleware/asyncErrors');
const ApiFeatures = require("../utils/featuresAPI");
//Create Products --Admin
exports.createProduct =asyncErrors( async (req,res,next)=>{

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});
//Return all products
exports.getAllProducts =asyncErrors( async (req,res)=>{

    const resultsPerpage = 10;
    const productCount = await Product.countDocuments();
    const apiFeatures  =new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultsPerpage);
    const products = await apiFeatures.query;
    //const products = await Product.find({name:{$regex:"",$options:"i"}});
    res.status(200).json({
        success:true,
        products,
        productCount
    });
});

//Update Product details--Admin
exports.updateProduct = asyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    res.status(200).json({
        success:true,
        product
    });
});

//Remove Product
exports.deleteProduct =asyncErrors( async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully!"
    });
});

//get single product
exports.getProductDetails =asyncErrors( async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    res.status(200).json({
        success:true,
        product
    });
});

exports.createProductReview  = asyncErrors(async(req,res,next)=>{
    const {rating,comment,productId} = req.body
    const review = {
        user:req.user.id,
        name:req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        (rev)=>rev.user.toString()===req.user._id.toString()
    );
    console.log(isReviewed);
    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString()){
                (rev.rating=rating), (rev.comment=comment)
            }
        })
    }
    else{
        product.reviews.push(review);
        product.noOfReviews = product.reviews.length;
    }
    let avg=0;
    product.reviews.forEach(rev=>{
        avg = avg+rev.rating;
    });
    product.avgRating = avg/product.reviews.length;
    console.log(product.avgRating)
    await product.save({validateBeforeSave:false});
    res.status(200).json({
        success:true
    })
});

exports.getAllReviews = asyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("No Reviews Yet",404))
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews
    });
})

exports.deleteReview = asyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    const reviews = product.reviews.filter(rev=>rev._id.toString()!== req.query.id)
    let avg=0;
    reviews.forEach(rev=>{
        avg = avg+rev.rating;
    });
    const avgRating = avg/reviews.length;
    const noOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        avgRating,
        noOfReviews
    },
    {
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true
    })
})