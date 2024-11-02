import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllNews } from '../../../services/index/news'
import toast from 'react-hot-toast'
import ErrorMessage from '../../../components/ErrorMessage'
import ArticleCardSkeleton from '../../../components/ArticleCardSkeleton'
import stables from '../../../constants/stables'
import images from '../../../constants/images'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

function NewsBlog() {


    const {data , isLoading , isError} = useQuery({
        queryKey :  ["news"],
        queryFn :  () => getAllNews("" , 1 , 6),
        onError : (error) => {
            toast.error(error.message)
            console.log(error)
        },

    })


    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">From the blog</h1>

                    <p className="max-w-lg mx-auto mt-4 text-gray-500">
                        Salami mustard spice tea fridge authentic Chinese food dish salt tasty liquor. Sweet savory foodtruck
                        pie.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">

                    {
                        isLoading ? (
                            [...Array(3)].map((item , index) => (
                                <ArticleCardSkeleton key={index} className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"/>
                                    ))
                        ) : isError ? <ErrorMessage message="Couldn't fetch the News data"/> 
                        : (
                            data?.data?.map((news , index) => (
                                <div className='shadow-2xl border-b-2 border-blue-300/25 hover:-translate-y-6 duration-700' key={index}>
                                <div className="relative ">
                                    <img className="object-cover object-center w-full h-30 rounded-lg lg:h-80" src={news?.photo ? stables.UPLOAD_FOLDER_BASE_URL + news?.photo : images.NoImage} alt="" />
        
                                    <div className="absolute bottom-0 flex p-3 bg-white dark:bg-gray-200 rounded-lg ">
                                        <img className="object-cover object-center w-10 h-10 rounded-full" src={news?.user?.avatar ? stables.UPLOAD_FOLDER_BASE_URL + news?.user?.avatar : images.NoImage} alt="" />
        
                                        <div className="mx-4 flex items-center">
                                            <h1 className="text-sm text-gray-700 dark:text-gray-900 font-bold">
                                                {news?.user?.name}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
        
                                <h1 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
                                        {news?.title}
                                </h1>
        
                                <hr className="w-32 my-6 text-blue-500" />
        
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {news?.caption}
                                </p>

                                <Link
                                    to = {`news/${news?.slug}`}
                                    className='hover:animate-bounce mt-3 mb-3 flex w-fit items-center gap-x-2 font-bold text-white border-2 border-blue-300/25 px-6 py-3 rounded-lg'>
                                    <span className=''>More Articles </span>
                                    <FaArrowRight className='w-3 h-3 '/>
                                </Link>

                            </div> 
                            ))
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default NewsBlog