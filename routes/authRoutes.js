const express = require('express');
const router = express.Router();
const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken");
const {jwtkey} = require("../key")

router.post('/signup', async(request, response)=>{
    console.log(request.body)
    
    const {email, password} = request.body

    try {
        
            const user = userModel({email, password})
        
        await user.save()
        const token = jwt.sign({userId: user._id},jwtkey)
        response.json({token})

    } catch (error) {
       return  response.status(422).json(error)
    }

})


router.post('/login', async(request ,response)=>{
    const {email, password} = request.body
    if(!email || !password){
        return response.status(422).json({message: "fill email and password"})
    }
    const user = await userModel.findOne({email})
    if(!user){
        return response.status(422).json({error: "email is not valid"})
    }

    try {
        await user.comparePassword(password)

        const token = jwt.sign({userId: user._id},jwtkey)
        response.json({token})

    } catch (error) {
        return response.status(422).json({error: "catch error"})
    }
})


module.exports = router

