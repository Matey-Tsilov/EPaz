const router = require('express').Router()
const { isUser, isOwner } = require('../middlewares/guards')
const productService = require("../services/productService")
const mongooseErrorMapper = require('../utils/mongooseErrorMapper')

router.get('/', async (req, res) => {
    try {
        const items = await productService.getAll()
        res.json(items)
    } catch (error) {
        const errorMsg = mongooseErrorMapper(error)
        res.status(404).json({message: errorMsg})
    }
})
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const item = await productService.getById(id)
        res.json(item)
    } catch (error) {
        const errorMsg = mongooseErrorMapper(error)
        res.status(404).json({message: errorMsg})
    }
})
router.post('/', isUser(), async (req, res) => {
    const body = req.body
    body._ownerId = req.user._id
    try {
        const createdItem = await productService.create(body)
        res.status(201).json(createdItem)
    } catch (error) {
        const errorMsg = mongooseErrorMapper(error)
        res.status(404).json({message: errorMsg})
    }
})
router.put('/:id', isUser(), isOwner(productService), async (req, res) => {
    const id = req.params.id
    const updatedItem = req.body
    try {
        const result = await productService.updateById(id, updatedItem)
        res.json(result)
    } catch (error) {
        const errorMsg = mongooseErrorMapper(error)
        res.status(404).json({message: errorMsg})
    }
})
router.delete('/:id', isUser(), isOwner(productService), async (req, res) => {
    const id = req.params.id
    try {
        const result = await productService.deleteById(id)
        res.json(result)
    } catch (error) {
        const errorMsg = mongooseErrorMapper(error)
        res.status(404).json({message: errorMsg})
    }
})

module.exports = router
