const express = require('express')
const router = express.Router()
const ProductService = require('./../../services/products')
const {
    productIdSchema,
    productTagSchema,
    createProductSchema,
    updateProductSchema
} = require('./../../utils/schemas/products')
const validation = require('./../../utils/middlewares/validationHandler')

const productService = new ProductService()

router.get('/', validation(createProductSchema), async function (req, res, next) {
    try {
        const { tags } = req.query
        console.log('tags', tags)
        
        const products = await productService.getProducts({ tags })
    
        res.status(200).json({
            data: products,
            message: 'products listed'
        })
    } catch (error) {
        next(error)
    }
})

router.get('/:productId', async function (req, res, next) {
    try {
        const { productId } = req.params
        
        const product = await productService.getProduct({ productId })
    
        res.status(200).json({
            data: product,
            message: 'product retrieved'
        })
    } catch (error) {
        next(error)
    }
})

router.post('/', async function (req, res, next) {
    try {
        const { body: product } = req
        const createdProduct = await productService.createProduct({ product })
    
        res.status(201).json({
            data: createdProduct,
            message: 'products listed'
        })
    } catch (error) {
        next(error)
    }
})

router.put('/:productId', 
    validation({ productId: productIdSchema }, 'params'),
    validation(updateProductSchema), async function (req, res, next) {
    try {
        const { productId } = req.params
        const product = await productService.updateProduct({ productId })
        
        res.status(200).json({
            data: product,
            message: 'product updated'
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:productId', async function (req, res, next) {
    try {
        const { productId } = req.params
        const { body: productData } = req
    
        const product = await productService.deleteProduct({ productId, product: productData })
    
        res.status(200).json({
            data: product,
            message: 'product deleted'
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router