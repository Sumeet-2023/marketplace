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
const mockOrders = [
    { ProductID: ['rec7gac57Vdi2JgAO'], BuyerDetails: 'John Doe - johndoe@example.com', Status: 'Pending' },
    { ProductID: ['recMm6LkvtAexLbES'], BuyerDetails: 'Jane Smith - janesmith@example.com', Status: 'Confirm' },
    { ProductID: ['recWl09CaRyLNdaQL'], BuyerDetails: 'Tom Brown - tombrown@example.com', Status: 'Shipped' },
    { ProductID: ['recyKe6sWuycjUREq'], BuyerDetails: 'Alice Johnson - alicejohnson@example.com', Status: 'Cancelled' },
];
const populateOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const order of mockOrders) {
            yield airtableClient_1.airtableClient.post('/Orders', {
                fields: {
                    ProductID: order.ProductID, // Ensure this is an array
                    BuyerDetails: order.BuyerDetails,
                    Status: order.Status,
                },
            });
            console.log(`Added order for product ID: ${order.ProductID[0]}`);
        }
        console.log('Mock orders added successfully!');
    }
    catch (error) {
        console.error('Error populating orders:', error.response ? error.response.data : error.message);
    }
});
populateOrders();
