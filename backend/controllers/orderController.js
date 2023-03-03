const Order = require("../DataModels/orderModel")
const Product = require("../DataModels/productModel")
const ErrorHandler = require("../utils/errorHandler")
const asyncError = require("../middleware/asyncErrors")

exports.newOrder = asyncError(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order  = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    });

    res.status(200).json({
        success:true,
        order
    })
});

exports.getSingleOrder = asyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    )
    if(!order){
        return next(new ErrorHandler("Order not found !",404));
    }

    res.status(200).json({
        success:true,
        order
    });
});
 //for user to see orders
exports.myOrders = asyncError(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});
    
    res.status(200).json({
        success:true,
        orders
    });
});

exports.getAllOrders = asyncError(async(req,res,next)=>{
    const orders = await Order.find();
    let totalAmount=0
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });
    
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    });
});

exports.updateOrder = asyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("order delivered already",400))
    }
    order.orderItems.forEach(async (order)=>{
        await updateStock(order.product,order.quantity);
    });
    order.orderStatus = req.body.status;
    if(order.orderStatus==="Delivered"){
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        order
    });
});

async function updateStock(id,quantity){
    const product = await Product.findById(id)
    product.stock -= quantity;
    await product.save({validateBeforeSave:false});
}


exports.deleteOrders = asyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    
    if(!order){
        return next(new ErrorHandler("Order not found !",404));
    }

    await order.remove();
    res.status(200).json({
        success:true,
        
    });
});
