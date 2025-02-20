const express = require("express");
const router = express.Router();
const { isAuthenticated,isAdmin } = require("../middleware/userAuth.middleware");
const { createOrder, getOrder,getAllOrder,updateOrder } = require("../controllers/order.controller");

router.post("/create-order", isAuthenticated, createOrder);
router.get("/get-order", isAuthenticated, getOrder);
router.get("/getall-order", isAuthenticated,isAdmin, getAllOrder);

router.put("/update-order", isAuthenticated,isAdmin, updateOrder);

module.exports = router;
