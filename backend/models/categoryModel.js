import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "check out my category!"
    },
    
});
export const Category= mongoose.model('Category', categorySchema);
