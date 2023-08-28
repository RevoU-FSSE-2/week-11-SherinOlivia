"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productrouter = express_1.default.Router();
// Get All Product Data ===> Open to everyone
// productrouter.get('/', productsController.getAllProduct);
// Get One Product Data by id
// productrouter.get('/:id', productsController.getOneProductId);
// Get One Product Data by name
// productrouter.get('/:name', productsController.getOneProductName);
// Create / Add new Product ===> Staff & Admin Only!
// productrouter.post('/new',authenMiddleware, authorMiddleware({ roles: ['staff', 'admin'] }), productsController.createNewProduct);
// Update Product Qty / Price ===> Staff & Admin Only!
// productrouter.patch('/update/:id',authenMiddleware, authorMiddleware({ roles: ['staff', 'admin'] }), productsController.updateProduct);
// "Delete" Product == isDeleted ===> Admin Only!
// productrouter.delete('/:id',authenMiddleware, authorMiddleware({ roles: ['admin'] }), productsController.deleteProduct);
// export default productrouter
