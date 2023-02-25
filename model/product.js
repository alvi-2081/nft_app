const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//creating schema of product
const product_schema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    upload_date: {
        type: Date,
        default: new Date()
    },

    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: true
    },
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
})

//creating collection
const product = new mongoose.model('product', product_schema)

//export collection
module.exports = { product };