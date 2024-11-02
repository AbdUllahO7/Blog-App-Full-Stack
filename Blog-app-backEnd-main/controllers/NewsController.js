import News from "../models/NewsBlog"
import { v4 as uuidv4 } from 'uuid';
import { uploadPicture } from "../middleware/uploadPictureMiddleware";
import { fileRemover } from "../utils/fileRemover";
import Comment from "../models/Comment";


const createNews = async (req , res , next) => {

    try {
        const news = new News({
            title: "This is a news title ",
            caption:"this is a news caption and caption is optional and optional caption is optional and optional caption is optional",
            slug: uuidv4(),
            body: { 
                type : "doc",
                content : [],
            },
            photo:  "",
            user: req.user._id, 
        });

        const createdNews = await news.save();
        res.json(createdNews);


    } catch (error) {
            next(Error)
    }
}



const deleteNews = async (req, res , next) => {

    try {
        const news = await News.findOneAndDelete({slug: req.params.slug});

        if(!news) {
            const error = new Error("New not found")
            return next(error);
        }

        fileRemover(news.photo);

            await Comment.deleteMany({news : news._id});

        return res.json({
            message : "News deleted successfully",
        })

    } catch (error) {
        next(error);
    }

}

const getNews = async (req, res, next) => {
    try {
        const news = await News.findOne({ slug: req.params.slug }).populate([
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

        if (!news) {
            const error = new Error("News not found");
            error.status = 404;
            return next(error);
        }

        return res.json(news);
    } catch (error) {
        next(error);
    }
};



const getAllNews = async (req , res , next) => {
    try {
        const filter = req.query.searchKeyword;
        let where = {};
        if(filter){
            where.title = {$regex: filter ,$options : 'i'};
        }
        let query = News.find(where);
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * pageSize;
        const total = await News.find(where).countDocuments();
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


const  updateNews = async(req , res , next) => {
    try {
        const news =  await News.findOne({slug: req.params.slug});
        
        if(!news) {
            const error = new Error("News not found")
            next(error)
            return;
        }


        const upload = uploadPicture.single('newsPicture');

        const handleUpdateNewsData = async (data) => {
            const {title , caption , slug , body , tags , categories } = JSON.parse(data);
            news.title = title || news.title ;
            news.caption = caption || news.caption ;
            news.slug = slug || news.slug ;
            news.body = body || news.body ;
            news.tags = tags || news.tags ;
            news.categories = categories || news.categories ;
            const updatedNews = await news.save();
            return res.json(updatedNews)
        }
        
        upload(req , res , async function (err){
            if(err) {
                const error = new Error("n unknown error occurred while uploading profile picture")
                next(error);
            }else {
                // everything went will 
                let filename; 
                if(req.file) {
                    filename = news.photo;
                    if(filename) {
                        fileRemover(filename);
                    }
                    news.photo = req.file.filename;
                    handleUpdateNewsData(req.body.document)
                }else {
                    let filename; 
                    filename = news.photo;
                    news.photo = "";
                    fileRemover(filename);
                    handleUpdateNewsData(req.body.document)

                }

            }
        })



    } catch (error) {
        next(error);
    }
}



export  {getAllNews , getNews , deleteNews , createNews , updateNews};