"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
router.get('/', productController_1.getAllProducts);
router.post('/', productController_1.addProduct);
router.patch('/:id', productController_1.updateProduct);
router.delete('/:id', productController_1.deleteProduct);
router.get('/search', productController_1.getProducts);
exports.default = router;
