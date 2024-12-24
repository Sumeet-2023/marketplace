"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrder = exports.getAllOrders = void 0;
const airtableService_1 = require("../services/airtableService");
// Get all orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, airtableService_1.fetchOrders)();
        res.status(200).json(orders);
    }
    catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});
exports.getAllOrders = getAllOrders;
// Add a new order
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = yield (0, airtableService_1.createOrder)(req.body);
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.error('Error adding order:', error.message);
        res.status(500).json({ message: 'Error adding order', error });
    }
});
exports.addOrder = addOrder;
