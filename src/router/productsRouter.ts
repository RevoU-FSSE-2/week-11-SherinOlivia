import express from 'express'
const productrouter = express.Router()
// import productsController from '../controller/productsController';
import authenMiddleware from '../middleware/authenticationMiddleware'
import authorMiddleware from '../middleware/authorizationMiddleware'

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