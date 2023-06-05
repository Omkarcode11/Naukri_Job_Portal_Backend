const { role } = require("../constancs/roles.contsancs")
const Company = require("../model/Company")
const User = require("../model/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.signup = async (req, res) => {
    try {

        req.body.password = bcrypt.hashSync(req.body.password, 8)

        if (req.body.role == 'STUDENT') {
            let student = await User.create(req.body)
            if (student) {
                return res.status(200).send("student is Created Successfully")
            }
        } else if (req.body.role == "COMPANY") {
            let company = await Company.create(req.body)
            if (company) {
                return res.status(200).send("company is Created Successfully")
            }
        } else {
            return res.status(400).send("invalid role provided")
        }

    } catch (err) {
        return res.status(500).send('internal server error')
    }

}
exports.signin = async (req, res) => {
    let obj
    if (req.body.role == role.company) {
        let company = await Company.findOne({ companyEmail: req.body.companyEmail })

        if (!company) {
            return res.status(400).send("company not found Enter different companyEmail")
        }

        let isValid = await bcrypt.compare(req.body.password, company.password)

        if (!isValid) {
            return res.status(400).send("Password Incorrect")
        }

        obj = {
            companyName: company.companyName,
            role: company.role
        }

    }
    else if (req.body.role == role.student) {
        let student = await User.findOne({ email: req.body.email })

        if (!student) {
            return res.status(400).send("student not found Enter different email")
        }

        let isValid = await bcrypt.compare(req.body.password, student.password)

        if (!isValid) {
            return res.status(400).send("Password Incorrect")
        }

        obj = {
            firstName: student.firstName,
            lastName: student.lastName,
            role: student.role
        }

    }
    let token = jwt.sign(obj, process.env.SECRET_KEY, { expiresIn: '1h' })

    return res.status(200).send(token)



}