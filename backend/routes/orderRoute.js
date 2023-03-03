const express = require('express');
const router = express.Router();
const {newOrder, getSingleOrder, myOrders, getAllOrders,updateOrder, deleteOrders} = require("../controllers/orderController");
const {isAuthenticated,authorizeRoles} = require('../middleware/auth');

router.route("/order/new").post(isAuthenticated,newOrder);
router.route("/order/:id").get(isAuthenticated,authorizeRoles("admin"),getSingleOrder);
router.route("/orders/me").get(isAuthenticated,myOrders);
router.route("/admin/orders").get(isAuthenticated,authorizeRoles("admin"),getAllOrders);
router.route("/admin/order/:id").put(isAuthenticated,authorizeRoles("admin"),updateOrder)
                                .delete(isAuthenticated,authorizeRoles("admin"),deleteOrders);
module.exports = router;