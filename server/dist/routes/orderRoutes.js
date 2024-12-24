"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const router = (0, express_1.Router)();
router.get('/', orderController_1.getAllOrders); // Fetch all orders
router.post('/', orderController_1.addOrder); // Place a new order
exports.default = router;
