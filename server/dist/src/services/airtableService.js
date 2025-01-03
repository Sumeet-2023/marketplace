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
const validStatuses = ['Pending', 'Confirm', 'Shipped', 'Cancelled'];
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
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { ProductID, BuyerDetails, Status } = order;
        // Validate required fields
        if (!ProductID || !BuyerDetails || !Status) {
            throw new Error('Missing required fields: ProductID, BuyerDetails, or Status');
        }
        // Fetch the product name using ProductID
        const products = yield (0, exports.fetchProducts)();
        const product = products.find((p) => p.id === ProductID);
        if (!product) {
            throw new Error(`Product with ID ${ProductID} not found`);
        }
        const ProductName = product.fields.Name; // Extract the product name
        // Create the order with ProductName included
        const response = yield airtableClient_1.airtableClient.post('/Orders', {
            fields: {
                ProductID: [ProductID], // Airtable expects an array for linked fields
                BuyerDetails,
                Status,
                ProductName, // Include the product name in the order
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error creating order:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw new Error(`Failed to create order: ${((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message}`);
    }
});
exports.createOrder = createOrder;
