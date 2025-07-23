import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import validateEmail from '../utils/validateEmail.js'
import bcrypt from "bcrypt"
import { isObjectIdOrHexString } from 'mongoose'

// @route GET /users
const getUsers = asyncHandler(async (req, res) => {

    const user = await User.find()
        .select("-password -__v") //exclude password and __v field
    //return result to frontend
    res.status(200).send(user)
    
})


// @route POST /users
const addUser = asyncHandler(async (req, res) => {
    const {name, email, password, birthdate, role} = req.body
    if (!email || !password || !name || !birthdate || !role) return res.status(400).send({message: "A field is currently missing"})

    const date = new Date(birthdate)
    if (role !== "ADMIN" && role !== "USER") return res.status(400).send({message: `Invalid Role (USER/ADMIN) input: ${role}`})
    if (!validateEmail(email)) return res.status(400).send({message: "The email you have provided is not in the correct format"})
    
    let user = await User.findOne({email: email})
    if (user) return res.status(409).send({message: "Email already taken"})
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //create new User
    const newUser = new User({
        name,
        email, 
        password: hashedPassword,
        birthdate: date,
        role,
        isActive: true,
    })

    const success = await newUser.save()
    if (!success) return res.status(400).send({message: "Error creating user"})

    //return result to frontend
    res.status(200).send({
        email: email,
        message: "User created!"
    })
})


// @route PUT /users/:id
const updateUser = asyncHandler(async (req,res) => {

    const update = req.body
    const {id} = req.params
    if (!id) return res.status(400).send({message: "No parameter (id)"})
    if (!isObjectIdOrHexString(id)) return res.status(400).send({message: "Invalid id"})
    //returns document if found
    const found = await User.findOneAndUpdate({_id: id}, update) //atomic

    if (!found) return res.status(404).send({message: "User not found"})

    return res.status(200).send({message: "User updated succesfully"})

})

// @route DELETE /users/:id
const deleteUser = asyncHandler(async (req,res) => {
    const {id} = req.params
    if (!id) return res.status(400).send({message: "No parameter (id)"})
    if (!isObjectIdOrHexString(id)) return res.status(400).send({message: "Invalid id"})
    //returns document if found
    const found = User.findOneAndDelete({_id: id})

    if (!found) return res.status(404).send({message: "User not found"})
  
    await found.exec()
    return res.status(200).send({message: "User deleted succesfully"})
})


export { getUsers, addUser, updateUser, deleteUser }