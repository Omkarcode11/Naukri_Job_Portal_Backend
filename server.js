const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./model/User')
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL)

let db = mongoose.connection

db.on('err', () => {
    console.log('Error While connection to DB')
})

db.once('open', () => {
    console.log("connected to mongodb")
    createAdmin()
})



async function createAdmin() {
    let user = await User.findOne({ role: "ADMIN" })
    if (user) {
        console.log("Admin user already present")
        return
    } else {
        try {
            user = await User.create({
                firstName: "Omkar",
                lastName: "Sonawane",
                phone: '7841935494',
                email: "omkarsonawaneomkar2@gmail.com",
                password :"Omkar@admin",
                role: "ADMIN"
            })
            console.log(user)
        } catch (err) {
            console.log(err, 'admin is not created')
        }
    }
}








app.get('/', (req, res) => res.send('Hello World!'))


require('./routes/auth.routes')(app)





app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))