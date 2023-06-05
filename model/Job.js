let mongoose = require('mongoose')

let jobSchema = mongoose.Schema({
    _companyId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    applicants: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date
    }

})




module.exports = mongoose.model('Job', jobSchema)