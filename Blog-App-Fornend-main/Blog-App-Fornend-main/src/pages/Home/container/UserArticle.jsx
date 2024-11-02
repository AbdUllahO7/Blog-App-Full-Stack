import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import UserArticleCard from '../../../components/UserArticleCard';
import toast from 'react-hot-toast';
import ArticleCardSkeleton from '../../../components/ArticleCardSkeleton';
import ErrorMessage from '../../../components/ErrorMessage';
import { useQuery } from '@tanstack/react-query';
import { getAllUserArticle } from '../../../services/index/userArticle';


function UserArticle() {

    
    const {data , isLoading , isError } = useQuery({
        queryFn : () => getAllUserArticle("" , 1 , 6),
        queryKey : ["userArticle"],
        onError : (error) => {
            toast.error(error.message)
            console.log(error)
        },
    })


    console.log("data" , data)


    return (

        <section className='flex flex-col container mx-auto min-h-[700px]  px-5 py-10 mt-10 mb-10 '>
            <div className="text-center mb-5">
                        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl border-b-2 pb-2 border-primary w-fit mx-auto">
                            Users Blogs 
                        </h1>

                        <p className="max-w-lg mx-auto mt-4 text-gray-500">
                            Salami mustard spice tea fridge authentic Chinese food dish salt tasty liquor. Sweet savory foodtruck
                            pie.
                        </p>
                    </div>


                <div className='flex flex-wrap md:gap-x-5 gap-y-5 pb-10 pt-14'>
                    {isLoading ? (
                        [...Array(3)].map((item , index) => (
                            <ArticleCardSkeleton key={index} className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"/>
                                ))
                    ) : isError ? <ErrorMessage message="Couldn't fetch the article data"/> 
                    : data?.data?.map((article) => (
                        <UserArticleCard 
                        className=""     
                        key={article._id} 
                        article = {article} 
                        
                        />
                        ))}

                </div>
                

            </section>
        
        );
}

export default UserArticle


