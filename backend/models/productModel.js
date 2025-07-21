import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        default:"check out my product!"
    },
    image:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true
    },
    sellerID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
    },
    categoryID: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // Reference to Category model
        required: true
      }    
    
},{timestamps:true});

export const Product =mongoose.model('Product',productSchema);