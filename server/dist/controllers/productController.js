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
exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getAllProducts = void 0;
const airtableService_1 = require("../services/airtableService");
// Get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, airtableService_1.fetchProducts)();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});
exports.getAllProducts = getAllProducts;
// Add a product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield (0, airtableService_1.createProduct)(req.body);
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
});
exports.addProduct = addProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id; // Airtable record ID
    const updatedFields = req.body; // Fields to update
    try {
        const updatedProduct = yield (0, airtableService_1.updateProductById)(productId, updatedFields);
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ message: 'Error updating product', error });
    }
});
exports.updateProduct = updateProduct;
// Delete a product by ID
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id; // Airtable record ID
    try {
        yield (0, airtableService_1.deleteProductById)(productId);
        res.status(200).json({ message: `Product with ID ${productId} deleted successfully.` });
    }
    catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ message: 'Error deleting product', error });
    }
});
exports.deleteProduct = deleteProduct;
