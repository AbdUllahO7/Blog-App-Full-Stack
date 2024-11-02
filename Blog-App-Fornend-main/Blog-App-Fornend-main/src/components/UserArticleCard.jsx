
import {  Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { images, stables } from "../constants";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

    function UserArticleCard( {
    className , 
    article
  }) {
    return (
        <Card className="w-full max-w-[30rem] flex-row  hover:bg-gray-100 duration-500 mt-5 hover:-translate-y-6">
            <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
            <img
                src={article?.photo ? stables.UPLOAD_FOLDER_BASE_URL + article?.photo  : images.NoImage}
                alt="card-image"
                className="h-full w-full object-cover"
            />
            </CardHeader>
            <CardBody className="pb-3" >
            <Typography variant="h6" color="gray" className="mb-4 uppercase">
                {article?.title}
            </Typography>

                <Typography color="gray" className="mb-8 font-normal">
                        {article?.user?.name}
                </Typography>
                <Link
                    to="/blog"
                    className='mt-12 hover:bg-blue-500 duration-700 hover:text-white border-blue-500 flex items-center gap-x-2 font-semibold text-blue-500 border-2  px-1 py-1 rounded-lg w-fit'>
                    <span className=''>More Articles </span>
                    <FaArrowRight className='w-2 h-2 '/>
                </Link>
            </CardBody>
        </Card>
    );
  }


  export default UserArticleCard;

