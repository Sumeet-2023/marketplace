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
const airtableClient_1 = require("../utils/airtableClient");
const mockProducts = [
    { Name: 'Product 1', Description: 'A great product', Price: 100, ImageURL: 'https://via.placeholder.com/150' },
    { Name: 'Product 2', Description: 'Another fantastic item', Price: 200, ImageURL: 'https://via.placeholder.com/150' },
    { Name: 'Product 3', Description: 'Must-have gadget', Price: 300, ImageURL: 'https://via.placeholder.com/150' },
    { Name: 'Product 4', Description: 'Best-selling accessory', Price: 150, ImageURL: 'https://via.placeholder.com/150' },
    { Name: 'Product 5', Description: 'Top-rated device', Price: 250, ImageURL: 'https://via.placeholder.com/150' },
];
const populateProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const product of mockProducts) {
            yield airtableClient_1.airtableClient.post('/Products', {
                fields: product,
            });
            console.log(`Added: ${product.Name}`);
        }
        console.log('Mock data added successfully!');
    }
    catch (error) {
        console.error('Error populating Airtable:', error.response ? error.response.data : error.message);
    }
});
populateProducts();
