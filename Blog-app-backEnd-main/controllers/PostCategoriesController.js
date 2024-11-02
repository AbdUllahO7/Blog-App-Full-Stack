import Post from "../models/Post";
import PostCategories from "../models/PostCategories";



const createPostCategory = async  (req , res , next) => {
    try {

        const { title } = req.body;
        const postCategory = await PostCategories.findOne({title});

        if(postCategory) {
            const error = new Error("Category is already exists");
            return next(error);
        };

        const newPostCategory = new PostCategories({
            title,
        })

        const savedNewPostCategory = await newPostCategory.save();
        return res.status(201).json(savedNewPostCategory);

    } catch (error) {
        next(error)
    }
};


const getAllPostCategories = async (req , res , next) => {
    try {
        const filter = req.query.searchKeyword;
        let where = {};
        if(filter){
            where.title = {$regex: filter ,$options : 'i'};
        }
        let query = PostCategories.find(where);
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * pageSize;
        const total = await PostCategories.find(where).countDocuments();
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
        const result =  await query.skip(skip).limit(pageSize).sort({updatedAt : "desc"});
        
        return res.json(result);

    } catch (error) {
        next(error);
    }
}


const updatePostCategory = async (req , res , next) => {
    try {
        
        const {title} = req.body;

        const postCategory = await PostCategories.findByIdAndUpdate(req.params.postCategoryId , {
            title
        }, 
        {
            new: true,
        },
    );
        
        if(!postCategory) {
            const error = new Error("Category not found");
            return next(error);
        }

        return res.json(postCategory);

    } catch (error) {
        next(error);
    }
}



const deletePostCategory = async (req , res , next) => {
    try {

        const categoryId = req.params.postCategoryId ;

        await Post.updateMany(
            {categories : {$in : [categoryId]}},
            {$pull : {categories : categoryId}}
        );

        await PostCategories.deleteOne({_id : categoryId});


        res.send({
            message : "Post Category deleted successfully",  // or return the deleted category object?  // it's better to return the count of deleted categories.
        });

    } catch (error) {
        next(error);
    }
}


const getSingleCategory = async (req, res, next) => {
    try {
        const postCategory = await PostCategories.findById(req.params.postCategoryId)
        
        if (!postCategory) {
            const error = new Error("post Category not found");
            error.status = 404;
            return next(error);
        }

        return res.json(postCategory);
    } catch (error) {
        next(error);
    }
};





export {createPostCategory , getAllPostCategories , updatePostCategory , deletePostCategory , getSingleCategory}