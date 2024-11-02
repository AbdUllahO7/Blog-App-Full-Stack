import React from 'react'
import images from '../constants/images'
import { FaCheck } from "react-icons/fa";
import stables from '../constants/stables';
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
function ArticleCard({ post,className}) {
    return (
        <div className={`rounded-xl overflow-hidden shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]
            ${className}`}>
            <Link to = {`blog/${post?.slug}`}>
            <img 
            src={post?.photo ? stables.UPLOAD_FOLDER_BASE_URL + post?.photo  : images.NoImage} 
            alt="title" 
            className='w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60'/>

            </Link>
            <div className='p-5'>
                    <Link to = {`blog/${post?.slug}`}>
                        <h2 className='font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px] '>{post?.title}</h2>
                        <p className='text-dark-light mt-3 text-sm md:text-lg'>{post?.caption}</p>
                    </Link>
                    <div className='flex justify-between flex-nowrap items-center mt-6'>
                        <div className='flex items-center gap-x-2 md:gap-x-2.5'>
                            <img src={post?.user?.avatar ? stables.UPLOAD_FOLDER_BASE_URL + post?.user?.avatar  : images.NoImage}  
                            alt="profileImage" className='w-9 h-9 md:w-10 md:h-10 rounded-full' />
                            <div className='flex flex-col '>
                                <h4 className="font-bold italic text-dark-soft text-sm md:text-base">{post?.user?.name}</h4>
                                <div className='flex items-center gap-x-2 '>
                                    <span className={`${post?.user?.verified ? "bg-[#36B37E]" : "bg-red-500"}  w-fit bg-opacity-20 p-1.5 rounded-full`}>
                                        {
                                            post?.user?.verified ?   <FaCheck className='w.15 h-1.5 text-[#36B37E]'/> : <IoMdClose className='w.15 h-1.5 text-red-500'/>
                                        }
                                        </span>
                                    <span className='italic text-dark-light text-xs md:text-sm'>
                                        {post?.user?.verified ? "  Verified  writer" : "Unverified writer"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span className='font-bold text-dark-light text-sm md:text-base'>
                            {new Date(post?.createdAt).getDate()} {new Date(post?.createdAt).toLocaleString("default" , {month : "long"})}
                        </span>
                    </div>
            </div>

        </div>
    )
}

export default ArticleCard