import { v4 as uuidv4 } from 'uuid';
import { uploadPicture } from "../middleware/uploadPictureMiddleware";
import { fileRemover } from "../utils/fileRemover";
import Comment from "../models/Comment";
import UserArticle from '../models/UserArticle';


const createUserArticle = async (req , res , next) => {

    try {
        const userArticle = new UserArticle({
            title: "This is a UserArticle title ",
            caption:"this is a UserArticle caption and caption is optional and optional caption is optional and optional caption is optional",
            slug: uuidv4(),
            body: { 
                type : "doc",
                content : [],
            },
            photo:  "",
            user: req.user._id, 
        });

        const createdUserArticle = await userArticle.save();
        res.json(createdUserArticle);


    } catch (error) {
            next(Error)
    }
}



const deleteUserArticle = async (req, res , next) => {

    try {
        const userArticle = await UserArticle.findOneAndDelete({slug: req.params.slug});

        if(!userArticle) {
            const error = new Error("user Article not found")
            return next(error);
        }

        fileRemover(userArticle.photo);

            await Comment.deleteMany({userArticle : userArticle._id});

        return res.json({
            message : "user Article deleted successfully",
        })

    } catch (error) {
        next(error);
    }

}

const getUserArticle = async (req, res, next) => {
    try {
        const userArticle = await UserArticle.findOne({ slug: req.params.slug }).populate([
            // get the user data 
            {
                path: "user",
                select: ['avatar', 'name'],
            },
            // get the category data
            {
                path: "categories",
                select: ['title'],
            },
            // get the comments data
            {
                path: "comments",
                match: {
                    check: true,
                    parent: null,
                },
                // get the child comments 
                populate: [
                    {
                        path: "user",
                        select: ['avatar', 'name'],
                    },
                    {
                        path: "replies",
                        match: {
                            check: true,
                        },
                        populate: {
                            path: "user",
                            select: ['avatar', 'name'],
                        },
                    },
                ],
            },
        ]);

        if (!userArticle) {
            const error = new Error("User Article not found");
            error.status = 404;
            return next(error);
        }

        return res.json(userArticle);
    } catch (error) {
        next(error);
    }
};



const getAllUserArticle = async (req , res , next) => {
    try {
        const filter = req.query.searchKeyword;
        let where = {};
        if(filter){
            where.title = {$regex: filter ,$options : 'i'};
        }
        let query = UserArticle.find(where);
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * pageSize;
        const total = await UserArticle.find(where).countDocuments();
        const pages = Math.ceil(total / pageSize);

        res.header({
            'x-filter' : filter,
            'x-totalCount' : JSON.stringify(total),
            'x-currentPage' : JSON.stringify(page),
            'x-pageSize' : JSON.stringify(pageSize),
            'x-totalPageCount' : JSON.stringify(pages),
        })


        if(page > pages ) {
            return res.json([]);
        }
        const result =  await query.skip(skip).limit(pageSize).populate([
            {
                path: "user",
                select: ['avatar', 'name' ,'verified'],
            },
            {
                path: "categories",
                select: ['title'],
            },
        ]).sort({updatedAt : "desc"});
        
        return res.json(result);

    } catch (error) {
        next(error);
    }
}


const  updateUserArticle = async(req , res , next) => {
    try {
        const userArticle =  await UserArticle.findOne({slug: req.params.slug});
        
        if(!userArticle) {
            const error = new Error("User Article not found")
            next(error)
            return;
        }


        const upload = uploadPicture.single('userArticlePicture');

        const handleUpdateUserArticleData = async (data) => {
            const {title , caption , slug , body , tags , categories } = JSON.parse(data);
            userArticle.title = title || userArticle.title ;
            userArticle.caption = caption || userArticle.caption ;
            userArticle.slug = slug || userArticle.slug ;
            userArticle.body = body || userArticle.body ;
            userArticle.tags = tags || userArticle.tags ;
            userArticle.categories = categories || userArticle.categories ;
            const updatedUserArticle = await userArticle.save();
            return res.json(updatedUserArticle)
        }
        
        upload(req , res , async function (err){
            if(err) {
                const error = new Error("n unknown error occurred while uploading profile picture")
                next(error);
            }else {
                // everything went will 
                let filename; 
                if(req.file) {
                    filename = userArticle.photo;
                    if(filename) {
                        fileRemover(filename);
                    }
                    userArticle.photo = req.file.filename;
                    handleUpdateUserArticleData(req.body.document)
                }else {
                    let filename; 
                    filename = userArticle.photo;
                    userArticle.photo = "";
                    fileRemover(filename);
                    handleUpdateUserArticleData(req.body.document)

                }

            }
        })



    } catch (error) {
        next(error);
    }
}



export  {getAllUserArticle , getUserArticle  , deleteUserArticle , createUserArticle , updateUserArticle};