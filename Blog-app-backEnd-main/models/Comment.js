import { Schema , model } from "mongoose";


// create Schema 
const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectID , required : true , ref : "User" },// foreign key s
    desc: { type : String , required : true , },
    post: { type : Schema.Types.ObjectID , required : true , ref : "Post" },// foreign key 
    check : { type : Boolean , default : false , },
    parent : { type : Schema.Types.ObjectID , default : null , ref : "Comment" ,},// foreign key 
    replayOnUser : {type : Schema.Types.ObjectId , ref : "User" , default : null },// foreign key 
},{timestamps : true , toJSON : {virtuals : true}});


// make relation between comment and comment 
CommentSchema.virtual('replies' , {
    ref : "Comment",
    localField : "_id",
    foreignField : "parent"
});




const Comment = model("Comment" , CommentSchema )

export default Comment;


