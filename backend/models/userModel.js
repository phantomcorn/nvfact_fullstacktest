/*
    Mongoose allows you to model data in MongoDB as object to help with types
*/

import mongoose from "mongoose"

//model for database
const userSchema = new mongoose.Schema({
    //ID built-in MongoDB
    name: {type: String, required: true},
    email : {type: String , required: true, unique: true},
    password : {type: String, required: true},
    birthdate: {
        type: Date, 
        required: true,
        get: v => v ? new Date(v).toISOString().slice(0, 10) : null
    },
    role: {type: String, required: true},
    //status (ACTIVE/INACTIVE)
    isActive: {type: Boolean, required: true},
}, { toJSON: {getters: true} })

//REST API on ThreadsDB.users
const User = mongoose.model("user", userSchema)

export default User;