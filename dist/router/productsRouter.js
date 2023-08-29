"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productrouter = express_1.default.Router();
const productsController_1 = __importDefault(require("../controller/productsController"));
const authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
const authorizationMiddleware_1 = __importDefault(require("../middleware/authorizationMiddleware"));
// Get All Product Data ===> Open to everyone
productrouter.get('/', productsController_1.default.getAllProduct);
// Get One Product Data by id
// productrouter.get('/:id', productsController.getOneProductId);
// Get One Product Data by name
productrouter.get('/:name', productsController_1.default.getOneProductName);
// Create / Add new Product ===> Staff & Admin Only!
productrouter.post('/new', authenticationMiddleware_1.default, (0, authorizationMiddleware_1.default)(['staff', 'admin']), productsController_1.default.createNewProduct);
// Update Product Qty / Price ===> Staff & Admin Only!
productrouter.patch('/update/:name', authenticationMiddleware_1.default, (0, authorizationMiddleware_1.default)(['staff', 'admin']), productsController_1.default.updateProduct);
// "Delete" Product == isDeleted ===> Admin Only!
// productrouter.delete('/:id',authenMiddleware, authorMiddleware(['admin']), productsController.deleteProduct);
exports.default = productrouter;
