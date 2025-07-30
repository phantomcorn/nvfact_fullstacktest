import jwt from "jsonwebtoken"

export function genRefreshToken(payload) {

    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "6h" } //expiry used to check against jwt.verify()
    )
}

export function genAccessToken(payload) {

    return jwt.sign(
        payload,  
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
    )
}


