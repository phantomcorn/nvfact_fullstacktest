/*
    PREV: /routes/authRoute.js
    NEXT: return result to frontend as JSON object

    This is where the backend logic happens
*/

import asyncHandler from 'express-async-handler'
import Account from "../models/userModel.js"
import validateEmail from '../utils/validateEmail.js'
// Hash function
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { genAccessToken, genRefreshToken } from '../utils/token.js'

// @route POST /login
const login = asyncHandler(async (req,res) => {

    const {email, password} = req.body

    /* ---------------------- BYPASS for new database without account ------------------ */
    if (email === "admin123@gmail.com" && password === "admin123!") {

        const accessToken = genAccessToken({"user": "admin123@gmail.com"})
        const refreshToken = genRefreshToken({"user": "admin123@gmail.com"})

        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server
            secure: true, //use https protocol
            sameSite: "none", //cross-site cookie
            maxAge: 6 * 60 * 60 * 1000//set to match refreshToken expiry (6h in ms)
        })

        return res.status(200).json({
            name: "ADMIN BYPASS",
            email: "admin123@gmail.com",
            birthdate: "2001-08-19",
            role: "ADMIN",
            isActive: true,
            token: accessToken//send access token to be use for subsequent API calls
        })
    }

    /* ---------------------------------------------------------------------------------- */
    if (!email || !password) return res.status(400).send({message: "A field is currently missing"})
    if (!validateEmail(email)) return res.status(400).send({message: "The email you have provided is not in the correct format"})

    let user = await Account.findOne({email: email})
    if (!user) return res.status(404).send({message: "No account associated with the provided email"})
    
    //compare plain text (password) to hashed text (user.password)
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).send({message: "Incorrect password"})
        
    //create(encode) access token
    const accessToken = genAccessToken({"user": user.email})

    //create(encode) refresh token
    const refreshToken = genRefreshToken({"user": user.email})

    //set cookie name 'jwt' as refreshToken with the following cookie options
    //this will be use when access token expires and we call `refresh`
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: true, //use https protocol
        sameSite: "none", //cross-site cookie
        maxAge: 6 * 60 * 60 * 1000//set to match refreshToken expiry (6h in ms)
    })


    //user did verify their email => login as normal
    res.status(200).json({
        name: user.name,
        email: user.email,
        birthdate: user.birthdate,
        role: user.role,
        isActive: user.isActive,
        token: accessToken//send access token to be use for subsequent API calls
    })  
})

// @route GET /refresh
const refresh = (req,res) => { 

    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).send({message: "Unauthorized (No cookies)"})

    //retrieve the refresh token that was stored in the cookie back from our intial login
    const refreshToken = cookies.jwt

    /*  
        Decode refresh token and compare against REFRESH_TOKEN_SECRET
        If valid, we get back the original payload content use to create our refresh token
        and we generate a new access token
    */
    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).send({message: "Forbidden (Invalid refresh token)"})

            /* ---------------------- BYPASS for new database without account ------------------ */
            if (decoded.user === "admin123@gmail.com") {
                const accessToken = genAccessToken({"user": "admin123@gmail.com"})
                return res.json({ 
                    name: "ADMIN BYPASS",
                    email: "admin123@gmail.com",
                    birthdate: "2001-08-19",
                    role: "ADMIN",
                    isActive: true,
                    token: accessToken
                })
            }
            /* ---------------------------------------------------------------------------------- */

            const user = await Account.findOne({email: decoded.user})

            if (!user) return res.status(401).send({message: "Unauthorized (No user found)"})
            //refresh token valid => create new access token
            const accessToken = genAccessToken({"user": user.email})


            res.json({ 
                token: accessToken,
                name: user.name,
                email: user.email,
                birthdate: user.email,
                role: user.role,
                isActive: user.isActive,
            })
        })
    )
}

// @route POST /logout
// If exist, clear browser's jwt cookie
const logout = (req,res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(204).json({message: "No content"})
    res.clearCookie('jwt', {httpOnly: true, sameSite: "none", secure: true})
    res.status(200).json({ message: "Cookies cleared"})
}


export {
    //create, 
    //verifyEmail, 
    login, 
    refresh, 
    logout
}