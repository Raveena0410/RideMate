const user=require('../Model/Model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const register=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const existinguser=await user.findOne({email});
        if(existinguser){
            return res.status(400).json({message:"user already exist"})
        } 
        const hashedpassword=await bcrypt.hash(password,10);
        const newuser=await user.create({
            name,
            email,
            password:hashedpassword

        });
    
        res.status(201).json({message:"user created successfully",newuser})
    } catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error"})
    }
}
const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const existinguser=await user.findOne({email});
        if(!existinguser){
            return res.status(404).json({message:"user not found"})
        }
        const ispassword=await bcrypt.compare(password,existinguser.password);
        if(!ispassword){
            return res.status(400).json({message:"invalid password"})
        }
        const token=jwt.sign({id:existinguser._id},process.env._id,{expireIn:"1h"});
        res.status(200).json({message:"Login successful",token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error"})
    }
}
module.exports={register,login};

