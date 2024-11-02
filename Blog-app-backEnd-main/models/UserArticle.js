import { Schema , model } from "mongoose";


const UserArticleSchema = new  Schema({
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

UserArticleSchema.virtual('comments' , {
    ref : "Comment",
    localField : "_id",
    foreignField : "post"
});


const UserArticle = model("userArticle" , UserArticleSchema )


export default UserArticle;



