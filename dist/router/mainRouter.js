"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import orderrouter from './ordersRouter';
// import productrouter from './productsRouter';
const usersRouter_1 = __importDefault(require("./usersRouter"));
const router = express_1.default.Router();
// main app/page route
router.get("/", function (req, res) {
    res.status(200).json({
        success: true,
        message: "Hello, this is Sherin Olivia's Milestone Project 2 (Week 11)!"
    });
});
// Router:
// router.use('/api/orders', authenMiddleware, orderrouter)
// router.use('/api/products', productrouter)
router.use('/api/users', usersRouter_1.default);
exports.default = router;
