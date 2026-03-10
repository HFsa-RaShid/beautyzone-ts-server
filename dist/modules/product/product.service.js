"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductDB = exports.updateProductDB = exports.createProductDB = exports.getProductByIdDB = exports.getAllProductsDB = void 0;
const product_model_js_1 = require("./product.model.js");
const getAllProductsDB = async () => {
    return await product_model_js_1.Product.find({});
};
exports.getAllProductsDB = getAllProductsDB;
const getProductByIdDB = async (id) => {
    return await product_model_js_1.Product.findById(id);
};
exports.getProductByIdDB = getProductByIdDB;
const createProductDB = async (data) => {
    return await product_model_js_1.Product.create(data);
};
exports.createProductDB = createProductDB;
const updateProductDB = async (id, data) => {
    return await product_model_js_1.Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};
exports.updateProductDB = updateProductDB;
const deleteProductDB = async (id) => {
    return await product_model_js_1.Product.findByIdAndDelete(id);
};
exports.deleteProductDB = deleteProductDB;
