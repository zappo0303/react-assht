import express from 'express';
import { addProducts, getProducts, getProductsbyId, remove, updateProducts } from '../controller/products.js';


const ProductRouter = express.Router();

ProductRouter.get(`/products`, getProducts)
ProductRouter.post(`/products`, addProducts)
ProductRouter.put(`/products/:id`, updateProducts)
ProductRouter.get(`/products/:id`, getProductsbyId)
ProductRouter.delete(`/products/:id`, remove)

export default ProductRouter;