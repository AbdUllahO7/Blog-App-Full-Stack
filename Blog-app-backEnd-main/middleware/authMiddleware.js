import { verify } from "jsonwebtoken";
import User from "../models/User";

export const authGuard = async (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {

            const token = req.headers.authorization.split(" ")[1];
            const {id} = verify(token , process.env.JWT_SECRET);
            req.user = await User.findById(id).select("-password"); // -password now select the password 
            next()
            
        } catch (error) {
            let err = new Error("Not authorized , Token Failed" );
            err.status = 401;next(err);
        }
    }else {
        let error = new Error("Not authorized , No Token");
        error.statusCode = 401;
        next(error);
    }
}




export const  adminGuard = (req , res , next) => {
    if(req.user && req.user.admin) {
        next()
    }else {
        let error = new Error("Not authorized , You are not an admin");
        error.statusCode = 403;
        next(error);
    }
}