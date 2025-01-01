const {default:mongoose} =require('mongoose')

require('dotenv').config()

let URL = process.env.DB_URL

let db = async()=>{
    try {
        await mongoose.connect(URL)
        console.log("Database connected")

    } catch (error) {
        return false
    }
}

module.exports = db


