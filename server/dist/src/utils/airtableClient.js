"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.airtableClient = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`;
exports.airtableClient = axios_1.default.create({
    baseURL: AIRTABLE_API_URL,
    headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
    },
});
