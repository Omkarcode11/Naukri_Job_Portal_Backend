let mongoose = require('mongoose')


let userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "STUDENT"
    },
    createdAt: {
        type: Date,
        default: Date
    }
})


module.exports =  mongoose.model('User',userSchema)