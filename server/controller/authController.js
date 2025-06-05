import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import transporter from "../config/nodemailer.js"

export const deleteUsers=async(req,res)=>{
    const {email}=req.body
    if(!email){
        return res.json({success:false, message:"email req'd"})
    }
    try{
    const deleteUser= await userModel.findOneAndDelete({email})
    if(!deleteUser){
        return res.json({success:false, message:"no user with this email"})
    }
        return res.json({success:true, message:"deleted successfully"})
    }catch(error){
        return res.json({success:false, message: error.message})
    }

}


export const register= async (req, res)=>{

    const {name, email, password}=req.body

    if(!name || !email || !password)
    {
        return res.json({success:false, message:"missing details"})
    }
    try{
        const existingUser=await userModel.findOne({email})

        if(existingUser){
            return res.json({success:false, message: "user already registered"})
        }

//SENDING WELCOME EMAIL
const mailOptions={
    from: process.env.SENDER_EMAIL,
    to:email, 
    subject:"welcome to abel's site",
    text:`welcome to abel's site your account has been created with email id ${email} `
}
   await transporter.sendMail(mailOptions)

   const hashedPassword=await bcrypt.hash(password,10)

   const user = userModel({name, email, password:hashedPassword})
   await user.save()

   const token =jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'})
   res.cookie('token', token, {
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:process.env.NODE_ENV==='production' ?
    'none': 'strict',
    maxAge:7*24*60*60*100
   })

   await transporter.sendMail(mailOptions)

   return res.json({success:true ,message:"registered successfully"})

    } catch (error){
        res.json({sucess:false, message: error.message})

    }
}

export const login= async (req, res)=>{
    const {email, password}=req.body
    if(!email|| !password)
    {
        return res.json({success:false, message:"both fields are required"})
    }

    try{
        const user= await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"Invalid emial"})
        }
        const isMatch= await bcrypt.compare(password, user.password)
 
        if(!isMatch){
            return res.json({success:false, message: "inavalid password"})   
        }

        const token =jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'})

         res.cookie('token', token, {
         httpOnly:true,
         secure:process.env.NODE_ENV==='production',
         sameSite:process.env.NODE_ENV==='production' ?
         'none': 'strict',
         maxAge:7*24*60*60*100
        })
        return res.json({success:true})


    }catch(error)
    {
    res.json({success:false, message: error.message})
    }

}

export const logout= async (req, res)=>
{
    try {
        res.clearCookie('token',
            {
                httpOnly:true,
                secure:process.env.NODE_ENV==='production',
                sameSite:process.env.NODE_ENV==='production' ?
                'none': 'strict' 
            }
        )
        return res.json({success:true, message: "logged out"})
    } catch (error){
        return res.json({success:false , message: error.message})
    }
}
