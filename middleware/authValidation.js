const { role } = require("../constancs/roles.contsancs")
const Company = require("../model/Company")
const User = require("../model/User")

exports.signupValidation = async (req, res, next) => {
    if (!req.body.firstName) {
        return res.status(400).send("Invalid FirstName")
    }
    else if (!req.body.lastName) {
        return res.status(400).send("Invalid lastName")
    } else if (!req.body.email || !req.body.email.includes('@') || !req.body.email.includes('.') || req.body.email.length <= 4) {
        return res.status(400).send("Invalid email")
    }
    else if (!req.body.password) {
        return res.status(400).send("Invalid password")
    }
    if (req.body.role == role.student) {
        if (!req.body.phone || req.body.phone <= 6666666666 || req.body.phone >= 10000000000) {
            return res.status(400).send("Invalid Phone")
        }

        let email = await User.findOne({ email: req.body.email })

        if (email)
            return res.status(400).send("Email is Already exist")

        let phone = await User.findOne({ phone: req.body.phone })
        if (phone)
            return res.status(400).send("phone is Already exist")

    } else if (req.body.role == role.company) {
        if (!req.body.companyEmail || !req.body.companyEmail.includes('@') || !req.body.companyEmail.includes('.') || req.body.companyEmail.length <= 4) {
            return res.status(400).send("Invalid companyEmail")
        } else if (!req.body.companyPhone) {
            return res.status(400).send("Invalid Phone")
        } else if (!req.body.companyName) {
            return res.status(400).send('Invalid companyName')
        }

        let companyName = await Company.findOne({ companyName: req.body.companyName })
        if (companyName) {
            return res.status(400).send("company name is already exist")
        }
        let companyEmail = await Company.findOne({ companyEmail: req.body.companyEmail })

        if (companyEmail) {
            return res.status(400).send("company email is already exist")
        }

    }
    next()
}


exports.signinValidation = async (req, res, next) => {
    let roles = [role.admin, role.company, role.student]

    if (!roles.includes(req.body.role)) {
        return res.status(400).send("Invalid Role Request")
    }
    if (req.body.role == role.company) {
        if (!req.body.companyEmail || !req.body.companyEmail.includes('@') || !req.body.companyEmail.includes('.') || req.body.companyEmail.length <= 4) {
            return res.status(400).send("Invalid companyEmail")
        }
        next()
    } else if (req.body.role == role.admin || req.body.role == role.student) {
        if (!req.body.email || !req.body.email.includes('@') || !req.body.email.includes('.') || req.body.email.length <= 4) {
            return res.status(400).send("Invalid email")
        }
        next()
    }

}