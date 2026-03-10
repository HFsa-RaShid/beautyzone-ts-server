"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewDB = exports.getAllReviewsDB = exports.getReviewsByProductDB = void 0;
const review_model_js_1 = require("./review.model.js");
const mongoose_1 = __importDefault(require("mongoose"));
const getReviewsByProductDB = async (productId, page) => {
    const limit = 4;
    const skip = (page - 1) * limit;
    const reviews = await review_model_js_1.Review.find({ productId: new mongoose_1.default.Types.ObjectId(productId) })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);
    const totalReviews = await review_model_js_1.Review.countDocuments({ productId: new mongoose_1.default.Types.ObjectId(productId) });
    return { reviews, totalReviews, totalPages: Math.ceil(totalReviews / limit) };
};
exports.getReviewsByProductDB = getReviewsByProductDB;
const getAllReviewsDB = async () => {
    return await review_model_js_1.Review.find().sort({ date: -1 });
};
exports.getAllReviewsDB = getAllReviewsDB;
const createReviewDB = async (data) => {
    return await review_model_js_1.Review.create(data);
};
exports.createReviewDB = createReviewDB;
