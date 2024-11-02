import React from 'react'
import { useDataTable } from '../../../../hooks/useDataTable';
import { deleteNews, getAllNews } from '../../../../services/index/news';
import DataTable from '../../components/DataTable';
import stables from '../../../../constants/stables';
import images from '../../../../constants/images';
import { Link } from 'react-router-dom';

function ManageNews() {

        
const  {
    userState,
    currentPage , 
    searchKeyword,
    data : newsData, 
    setCurrentPage,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    submitSearchKeywordHandler,
    deleteDataHandler,
    searchKeywordHandler,
    } =  useDataTable({
        dataQueryFn : () => getAllNews(searchKeyword , currentPage),
        dataQueryKey : "news",
        deleteDataMessage : "News is deleted",
        mutateDeleteFn : ({slug , token}) => {
            return deleteNews({slug : slug, token : token});
        } 
    });



    return (
    <DataTable
        pageTitle="Mange News"
        dataLisName="News"
        searchInputPlaceHolder="News Title..."
        searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
        searchKeywordOnChangeHandler={searchKeywordHandler}
        searchKeyword={searchKeyword}
        tableHeaderTitleList={['Title' , "category" , "CreatedAt" , "Tags", "Actions"]}
        isLoading={isLoading}
        isFetching={isFetching}
        data = {newsData?.data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headers={newsData?.headers}
        userState={userState}
        >
            {
                newsData?.data?.map((news, index) => (
                    <tr key={index}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <a href="/" className="relative block">
                                        <img alt={news?.title} src={news?.photo ? stables.UPLOAD_FOLDER_BASE_URL + news?.photo : images.NoImage} className="mx-auto object-cover rounded-lg aspect-square w-10" />
                                    </a>
                                </div>
                                <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">{news?.title}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">
                                {news?.categories?.length > 0 ? news?.categories.slice(0 , 3).map((category , index) => (
                                    `${category?.title}${news?.categories.slice(0 ,3 ).length === index + 1 ? "" : ", " }`
                                )) : "Un categorized"}
                            </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">
                                {new Date(news?.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex gap-x-2">
                                {news?.tags?.length > 0 ? (
                                    news.tags.map((tag, index) => (
                                        <p key={index} className="bg-gray-100 p-2 rounded-lg">
                                            {tag}
                                        </p>
                                    ))
                                ) : (
                                    <span>No Tags</span>
                                )}
                            </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                            <button 
                            disabled={isLoadingDeleteData}
                            type='button'
                            onClick={() => {
                                deleteDataHandler({slug: news?.slug  , token: userState?.userInfo?.token})
                            }} 
                            className='text-red-600 hover-text-red-100 disabled:opacity-70 disabled:cursor-not-allowed bg-red-100 p-2 rounded-lg'>
                                Delete
                            </button>
                            <Link 
                                to={`/admin/news/manage/edit/${news?.slug}`}
                                className="text-green-600 hover:text-green-900 bg-green-100 p-2 rounded-lg"
                            >
                            edit
                            </Link>
                        </td>
                    </tr>
                ))

            }
        </DataTable>
    )
}

export default ManageNews