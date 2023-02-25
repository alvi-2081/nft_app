const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//creating schema of ads detail

const user_schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    middle_name: {
        type: String,
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone_number: {
        type: String,
        required: true,
    },
})

//creating collection
const users = new mongoose.model('user', user_schema)


//export collection
module.exports = { users };