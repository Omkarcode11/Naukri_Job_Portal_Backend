let authController = require('../controller/auth.controller')
const { signupValidation, signinValidation } = require('../middleware/authValidation')




module.exports = function (app) {

    app.post('/signup', signupValidation, authController.signup)
    app.post('/signin', signinValidation, authController.signin)

}