const express = require('express')
const router = express.Router()
const ProductsService = require('./../../services/products')

const productsService = new ProductsService()


router.get('/', async function (req, res, next) {
    try {
        const { tags } = req.query
        const products = await productsService.getProducts({ tags })
        res.render('products', { products })
    } catch (error) {
        next(error)
    }
})

module.exports = router