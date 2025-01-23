const express=require('express');
const router = express.Router();
const zod=require('zod');
const { User } = require('../db');
const { JWT_SECRET } = require('../config');
const jwt=require("jsonwebtoken");

const signUpBody=zod.object({
    username: zod.string().email(),
    password: zod.string(),
    lastName: zod.string(),
    firstName: zod.string()

})
router.post('/signup',async function(req, res){
    const response=signUpBody.safeParse(req.body);
    if(!response.success){
        return res.status(411).json({
            message: "Email already taken / Incorrent inputs"
        })
    }
    
    
    const existing= await UserActivation.findOne({usernme: req.body.username});
    if(existing){
        res.status(411).json({
            message: "Email already taken / Incorrent inputs"
        })
    }

    
    
    const user= await User.create({
        username: req. body.username,
        password: req.body.password,
        lastName: req.body.lastName,
        firstName: req.body.firstName
    })
    const userId= user._id;
    const token=jwt.sign({
        userId
    }, JWT_SECRET);
    res.json({
        message: "User created successfully",
        token
    })
})


const signInBody=zod.object({
    username: zod.string().email(),
    password: zod.string()
})
router.get('/signin', async (req, res) => {
    const user= await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if(user){
        const token=jwt.sign({userId: user.id}, JWT_SECRET);
        res.json({
            tokekn
        })
    }

    res.status(411).json({
        msg: "Error while logging in"
    })
})

module.exports = router;