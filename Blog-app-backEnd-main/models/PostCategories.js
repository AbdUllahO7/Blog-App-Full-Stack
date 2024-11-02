import { type } from "express/lib/response";
import { Schema , model } from "mongoose";


// create Schema 
const PostCategoriesSchema = new Schema({
    title: { type: String , required : true },
},{timestamps : true})



const PostCategories = model("PostCategories" , PostCategoriesSchema )

export default PostCategories;


