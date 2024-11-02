import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../services/index/posts'
import toast from 'react-hot-toast'
import ArticleCardSkeleton from '../../components/ArticleCardSkeleton'
import ArticleCard from '../../components/ArticleCard'
import ErrorMessage from '../../components/ErrorMessage'
import MainLayout from '../../components/MainLayout'
import Pagination from '../../components/Pagination'
import { useSearchParams } from 'react-router-dom'
import Search from '../../components/Search'

let isFirstRun = true 
function BlogPage() {

    const [searchParams , setSearchParams] = useSearchParams();

    const searchParamsValue = Object.fromEntries([...searchParams]);

    console.log(searchParamsValue);

    const currentPage = parseInt(searchParamsValue?.page ) || 1;
    const searchKeyword = searchParamsValue?.search  || "";

    const {data , isLoading , isError  , refetch , isFetching} = useQuery({
        queryFn : () => getAllPosts(searchKeyword , currentPage , 6),
        queryKey : ["posts"],
        onError : (error) => {
            toast.error(error.message)
            console.log(error)
        },
    })


    useEffect(() => {
        window.scrollTo(0,0);
        if(isFirstRun){
            isFirstRun = false;
            return;
        }
        refetch();
    } , [refetch , currentPage , searchKeyword]);

    const handlePageChange = (page) => {
        // change the pages query string in the url 
        setSearchParams({ page : page , search : searchKeyword });
    }
    
    const handleSearch = ({searchKeyword}) => {
        setSearchParams({ search : searchKeyword  , page : 1})
    }

    return (
        <MainLayout>

            <section className='flex flex-col container mx-auto  px-5 py-10 '>
                <Search 
                    className="w-full max-w-xl mb-10"
                    OnSearchKeyword={handleSearch}
                />

                <div className='flex flex-wrap md:gap-x-5 gap-y-5 pb-10'>
                    {isLoading || isFetching ? (
                        [...Array(3)].map((item , index) => (
                            <ArticleCardSkeleton key={index} className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"/>
                                ))
                    ) : isError ? <ErrorMessage message="Couldn't fetch the posts data"/> 
                    : data?.data?.length === 0 ? (
                        <p className='text-orange-500'>No Post Found</p>
                    ) : (
                        data?.data?.map((post) => (
                            <ArticleCard 
                            key={post._id} 
                            post = {post}
                            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                        ))
                    )}
                </div>
                {!isLoading && (
                <Pagination
                onPageChange={(page) => handlePageChange(page)}
                currentPage={currentPage}
                totalPageCount={JSON.parse(data?.headers?.["x-totalpagecount"])}
                // JSON.parse(headers?.['x-totalPageCount'])
                    />  
            )}

            </section>

            </MainLayout>

    )

}

export default BlogPage