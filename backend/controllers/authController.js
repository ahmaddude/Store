import { User } from "../models/userModel.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail,sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.js";
import cloudinary from "cloudinary";

export const signup=async(req,res)=>{
    const {email,password,name}=req.body;
    try {
        if(!email||!password||!name){
            throw new Error ("all fieldsare required");
        }
        const userAlreadyExists=await User.findOne({email});
                if(userAlreadyExists){
                    return res.status(400).json({success:false, message:"User already exists"});
                }
        const hashedPassowrd=await bcryptjs.hash(password,10);
        const verificationToken=Math.floor(100000+Math.random()*900000).toString();

        const user=new User({
            email,
            name,
            password:hashedPassowrd,
            verificationToken,
            verificationTokenExpiresAt:Date.now()+24*60*60*1000 //24 hours
        })
        await user.save();

        //JWT
        generateTokenAndSetCookie(res,user._id);
        await sendVerificationEmail(user.email,verificationToken);

        res.status(201).json({
            success:true,
            message:"User created Successfully",
            user:{
                ...user._doc,
                password:undefined
            },
        });

    } catch (error) {
        res.status(400).json({success:false, message: error.message});
    }
};

export const verifyEmail=async(req,res)=>{
    const {code}=req.body;
    try {
        const user=await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{
                $gt:Date.now(),
            },
        });
        if(!user){
            return res.status(400).json({success:false, message:"Invalid or expired verification code"});
        };
        user.isVerified=true;
        user.verificationToken=undefined;
        user.verificationTokenExpiresAt=undefined;
        await user.save();

        
        await sendWelcomeEmail(user.email,user.name);

        res.status(200).json({
            success:true,
            message:"Email verified",
            user:{
                ...user._doc,
                password:undefined
            }
        });

    } catch (error) {
        console.log("error in verify email",error);
        res.status(500).json({success:false, message:error.message});
    }
};

export const login=async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false, message:"Invalid credentials"});
        }
        const isPasswordMatched=await bcryptjs.compare(password,user.password);
        if(!isPasswordMatched){
            return res.status(400).json({success:false, message:"Invalid credentials"});
        }
        generateTokenAndSetCookie(res,user._id);
        
        user.lastLogin=new Date();
        await user.save();

        res.status(200).json({
            success:true,
            message:"User logged in successfully",});

    } catch (error) {
        console.log("error in login",error);
        res.status(500).json({success:false, message:error.message});
    }
};

export const logout=async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({success:true, message:"Logged out successfully"});
};

export const forgotPassword=async(req,res)=>{
    const {email}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message:"User not found"});
        };
        const resetToken=crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt=Date.now()+1*60*60*1000; //1 hour

        user.resetPasswordToken=resetToken;
        user.resetPasswordExpiresAt=resetTokenExpiresAt;
        await user.save();

        await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success:true, message:"Password reset email sent"});
    } catch (error) {
        console.log("error in forgot password",error);
        res.status(500).json({success:false, message:error.message});
    }
}

export const resetPassword=async(req,res)=>{
    try {
        const {token}=req.params;
        const {password}=req.body;
        const user=await User.findOne({
                    resetPasswordToken: token,
                    resetPasswordExpiresAt:{
                        $gt:Date.now(),
                    },
                });
        if(!user){
        return res.status(400).json({success:false, message:"Invalid or expired reset token"});
        };
                //update password

        const hashedPassowrd=await bcryptjs.hash(password,10);
                
        user.password=hashedPassowrd;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpiresAt=undefined;
        await user.save();
        
        await sendResetSuccessEmail(user.email);
        
        res.status(200).json({success:true, message:"Password reset successfully"});
    } catch (error) {
        console.log("error in reset password",error);
        res.status(500).json({success:false, message:error.message});
    }
};

export const checkAuth=async(req,res)=>{
    try {
        const user=await  User.findById(req.userId)
        if(!user){
            return res.status(400).json({success:false, message:"User not found"});
        }
        res.status(200).json({success:true, message:"User found", user:{
            ...user._doc,
            password:undefined
        }});
    } catch (error) {
        console.log("error in check auth",error);
    res.status(500).json({success:false, message:error.message});
    }
};

export const updateProfile = async(req,res)=>{
    cloudinary.config({ 
        cloud_name: 'dzycjab1i', 
        api_key: '626133734785613', 
        api_secret: 'dR1Ywvmg4kKwgKXZqS0YRuB4Ufw' // Click 'View API Keys' above to copy your API secret
    });
    try {
        const {profilePic}=req.body;
       const userId= req.userId;

       if(!profilePic){
           return res.status(400).json({message:"Profile pic is required"});
       }


      const uploadResponse= await cloudinary.uploader.upload(profilePic)
      
      const updatedUser= await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

      res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in update profile controller",error.message)
        res.status(500).json({message:"internal server error"});
    }
};

export const becomeASeller=async(req,res)=>{
    const userId=req.userId
try {
    const user=await User.findByIdAndUpdate(userId,{role:"seller"},{new:true});
    if(!user){
        return res.status(400).json({success:false, message:"User not found"});
    }
    res.status(200).json({success:true, message:"User role updated", user:{
        ...user._doc,
        password:undefined
    }});
} catch (error) {
    res.status(500).json({success:false, message:error.message});
}
}
