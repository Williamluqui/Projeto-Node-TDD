const express = require("express");
const user = require("../model/User");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let jwtToken = "Erfsara4564,/"

let User = mongoose.model("User",user)

router.get("/",(req, res)=>{
    res.json({});
});

router.post("/user",async(req,res)=>{
    const {name, password, email} = req.body
    if (name == "" || email == "" || password == "") {
        res.sendStatus(400) 
        return
    }
    try {
    let user = await User.findOne({"email":email})
      if (user != undefined) {
        res.status(400)
        res.json({error: "Email já cadastrado"})
        return
      }
      let hash = await bcrypt.hash(password,10)

        let newUser = new User({name:name, email: email, password: hash});
        await newUser.save();
    res.json({email:req.body.email})
    
    }catch(error) {
        res.sendStatus(500)
    }
   
})
router.delete("/user/:email", async(req, res)=>{
   await User.deleteOne({email:req.params.email})
   res.sendStatus(200)
})

router.post("/auth",async (req, res)=>{
    let {email,password}= req.body

   let user =  await User.findOne({"email":email})
   if (user == undefined) {
    res.status(403)
    res.json({errors:{email:"email não cadastrado"}})
    return
   }
  const isPasswordRight = await bcrypt.compare(password,user.password)
   if (!isPasswordRight) {
    res.statusCode = 403
    res.json({errors: {password:"senha invalida"}})
    return
   }
  
    jwt.sign({email,name:user.name,id:user._id},jwtToken,{expiresIn:'48h'},(err,token)=>{
        if (err) {
            res.sendStatus(500)
            console.log(err)
        }else{
            res.json({token:token})
        }
    });
})
module.exports = router