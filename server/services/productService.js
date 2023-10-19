const Product = require('../models/ProductModel')

exports.getAll = () => Product.find({})
exports.getById = (id) => Product.findById(id)
exports.create = (recordData) => Product.create(recordData)
exports.updateById = (id, updatedItem) => Product.findByIdAndUpdate(id, updatedItem) 
exports.deleteById = (id) => Product.findByIdAndDelete(id) 

