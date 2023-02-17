const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel")
const {jwtkey} = require("../key")

module.exports = (request, response,next)=>{
    const {authorization} = request.headers;

    if (!authorization){
        return response.status(401).json({error : "you must have token"})
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, jwtkey, async (err, payload) =>{
        if (err) {   
            response.status(401).json({error : "your token is wrong"})
        }
        const {userId} = payload;
        const user = await userModel.findById(userId)
        request.user = user

        next()
    } );
}