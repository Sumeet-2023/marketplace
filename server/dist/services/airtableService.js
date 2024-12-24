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
exports.createOrder = exports.fetchOrders = exports.deleteProductById = exports.updateProductById = exports.createProduct = exports.fetchProducts = void 0;
const airtableClient_1 = require("../utils/airtableClient");
// Fetch all products
const fetchProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield airtableClient_1.airtableClient.get('/Products'); // Replace 'Products' with your table name
        return response.data.records;
    }
    catch (error) {
        throw new Error(`Failed to fetch products: ${error}`);
    }
});
exports.fetchProducts = fetchProducts;
// Create a new product
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield airtableClient_1.airtableClient.post('/Products', {
            fields: product,
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Failed to create product: ${error}`);
    }
});
exports.createProduct = createProduct;
// Update a product by ID
const updateProductById = (id, updatedFields) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield airtableClient_1.airtableClient.patch(`/Products/${id}`, {
            fields: updatedFields,
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Failed to update product with ID ${id}: ${((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message}`);
    }
});
exports.updateProductById = updateProductById;
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield airtableClient_1.airtableClient.delete(`/Products/${id}`); // Use Airtable's DELETE method
        return response.data;
    }
    catch (error) {
        throw new Error(`Failed to delete product with ID ${id}: ${((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message}`);
    }
});
exports.deleteProductById = deleteProductById;
// Fetch all orders
const fetchOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield airtableClient_1.airtableClient.get('/Orders'); // Replace 'Orders' with your table name
        return response.data.records;
    }
    catch (error) {
        throw new Error(`Failed to fetch orders: ${((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message}`);
    }
});
exports.fetchOrders = fetchOrders;
// Create a new order
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield airtableClient_1.airtableClient.post('/Orders', {
            fields: order,
        });
        return response.data;
    }
    catch (error) {
        throw new Error(`Failed to create order: ${((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message}`);
    }
});
exports.createOrder = createOrder;
