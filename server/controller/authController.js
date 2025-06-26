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
    transporter.verify(function (error, success) {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to take messages");
  }
    });


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

export const sendVerifyOtp= async(req, res)=>{
 try{

    //send OTP to user's email
    const userId= req.user.id

    const user=await userModel.findById(userId)

    if(!user){
        return res.json({success:false, message:"user not found"})
    }

    if(user.isAccountVerified){
        return res.json({success:false , message:"account verified"})
    }

    const otp=String(Math.floor(100000+ Math.random()*900000))
    user.verifyOtp=otp
    user.verifyOtpExpireAt=Date.now()+24*60*60*1000

    await user.save()

    const mailOption={
        from:'abelferede916@gmail.com',
        to:user.email,
        subject:'OTP CODE',
        text:`your OTP code is ${otp}`
    }

    await transporter.sendMail(mailOption)

    res.json({success:true, message:'verification code sent please checke your email'})

    }catch (error){
        res.json({success:false , message:error.message})
    }

    }

export const verifyEmail= async (req, res)=>{
    const userId= req.user.id
    const {otp}=req.body
    if(!userId || !otp){
        return res.json({success:false, message:'missing details'}
        )
    }
    try{
        const user= await userModel.findById(userId)
        if(!user){
            return res.json({success:false, message: "user not found "})
        }
        if( user.verifyOtp== '' || user.verifyOtp!== otp){
            return res.json({
                success:false, message: 'invalid otp'
            })
        }
    if(user.verifyOtpExpireAt<Date.now()){
        return res.json({ success:false, message:'otp expired'})
    }
 
    user.isAccountVerified=true
    user.verifyOtp=''
    user.verifyOtpExpireAt=0

    await user.save()
    return res.json({success:true , message:'email verified'})

    }catch(error)
    {
        return res.json({success:false, message: error.message})
    }

    }

export const isAuthenticated= async (req, res) =>{

        try{
            return res.json({success:true})

        }catch(error){
            res.json({success:false, message: error.message})
        }
    }
export const sendResetOtp= async (req,res)=>{
    const {email}= req.body
  
    try{
    const user= await userModel.findOne({email})
    if(!user){
        return res.json({success:false, message:"no user found"})
    }
      const otp= String(Math.floor(100000+Math.random()*900000))

    const mailOption={
        from:"abelferede916@gmail.com",
        to:user.email,
        subject:"password reset OTP",
        text:`your OTP is ${otp} `
    }
   await transporter.sendMail(mailOption)

 

    user.resetOtp=otp
    user.resetOtpExpireAt=Date.now()+15*60*60*1000

    await user.save()
       return res.json({success:true, message:"OTP sent to your email"})
}catch(error){
    return res.json({success:false, message:error.message})
}
}
 

export const resetPassword= async (req,res)=>{
    const{email, otp,newPassword}=req.body

    if(!email|| !otp||!newPassword){
        return res.json({success:false, message:"email, otp and newpassord are req'd"})
    }
    try{
    const user= await userModel.findOne({email})
    if(!user){
        return res.json({success:false, message:"no user found"})
    }

    if(user.resetOtp===''|| user.resetOtp!==otp){
        return res.json({success:false, message:"invalid otp"})
    }
    if (user.resetOtpExpireAt<Date.now()){
        return res.json({success:false, message:"otp expired"})
    }
    const hashedPassword= await bcrypt.hash(newPassword,10)
    user.password=hashedPassword
    user.resetOtp=''
    user.resetOtpExpireAt=0

    await user.save()
    return res.json({success:true, message:"password resetted successfully"})
}catch(error){
    return res.json({success:false, message:error.message})
}
}