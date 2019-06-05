const express = require('express')
const router = express.Router()
const ProductsService = require('./../../services/products')
const { config } = require('./../../config')
const productsService = new ProductsService()

const cacheReponse = require('./../../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS } = require('./../../utils/time')


router.get('/', async function (req, res, next) {
    cacheReponse(res, FIVE_MINUTES_IN_SECONDS)
    
    try {
        const { tags } = req.query
        const products = await productsService.getProducts({ tags })
        res.render('products', { products, dev: config.dev })
    } catch (error) {
        next(error)
    }
})

module.exports = router