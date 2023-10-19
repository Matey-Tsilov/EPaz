const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'This property is required!'],
    minLength: [5, "The name should be more than 5 symbols"]
  },
  description: {
    type: String,
    required: [true, "The description is mandatory"],
    minLength: [15, "The description should be more than 15 characters"],
  },
  image: {
    type: Buffer,
    required: [true, "The image is mandatory"]
  },
  price: {
    type: Number,
    min: [1, 'The price should be a positive number']
  },
  _ownerId: {
   type: mongoose.Types.ObjectId,
   ref: 'User'
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
