const express = require("express");
const { getAllProducts,createProduct, 
    updateProduct, 
    deleteProduct, 
    getProductDetails, 
    createProductReview,
    getAllReviews,
    deleteReview} = require("../controllers/productController");
const router = express.Router();
const {isAuthenticated, authorizeRoles} = require('../middleware/auth');

router.route("/products").get( getAllProducts);
router.route("/product/new").post(isAuthenticated, authorizeRoles("admin"),createProduct);
router.route("/product/:id").put(isAuthenticated, authorizeRoles("admin"),updateProduct)
.delete(isAuthenticated, authorizeRoles("admin"),deleteProduct)
.get(getProductDetails);
router.route("/review").put(isAuthenticated,createProductReview);
router.route("/reviews").get(getAllReviews).delete(isAuthenticated,authorizeRoles("admin"),deleteReview);
module.exports = router;
//this creates route to get all products