import { Schema , model } from "mongoose";


// create Schema 
const PostSchema = new Schema({
    title: { type: String , required : true },
    caption:   { type: String , required: true },
    slug:  { type: String , required: true ,   unique: true },
    body: { type: Object , required: true },
    photo: { type: String , default: false , required: false},
    user: { type: Schema.Types.ObjectID , ref: "User" }, // foreign key 
    tags: { type: [String]},
    categories: [{type :Schema.Types.ObjectID , ref : "PostCategories"}] ,
    },
    {timestamps : true , toJSON : {virtuals : true}}
);


// make relation between post and comment 
PostSchema.virtual('comments' , {
    ref : "Comment",
    localField : "_id",
    foreignField : "post"
});

const Post = model("Post" , PostSchema )
export default Post;


