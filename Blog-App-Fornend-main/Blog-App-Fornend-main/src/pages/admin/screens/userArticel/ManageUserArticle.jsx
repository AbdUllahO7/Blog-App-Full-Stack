import React from 'react'
import { useDataTable } from '../../../../hooks/useDataTable';
import { Link } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import stables from '../../../../constants/stables';
import images from '../../../../constants/images';
import { deleteUserArticle, getAllUserArticle } from '../../../../services/index/userArticle';

function ManageUserArticle() {

  const  {
    userState,
    currentPage , 
    searchKeyword,
    data : articleData, 
    setCurrentPage,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    submitSearchKeywordHandler,
    deleteDataHandler,
    searchKeywordHandler,
    } =  useDataTable({
        dataQueryFn : () => getAllUserArticle(searchKeyword , currentPage),
        dataQueryKey : "userArticle",
        deleteDataMessage : "article is deleted",
        mutateDeleteFn : ({slug , token}) => {
            return deleteUserArticle({slug : slug, token : token});
        } 
    });



  return (
    <DataTable
        pageTitle="Mange Article"
        dataLisName="Article"
        searchInputPlaceHolder="Article Title..."
        searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
        searchKeywordOnChangeHandler={searchKeywordHandler}
        searchKeyword={searchKeyword}
        tableHeaderTitleList={['Title' , "category" , "CreatedAt" , "Tags", "Actions"]}
        isLoading={isLoading}
        isFetching={isFetching}
        data = {articleData?.data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headers={articleData?.headers}
        userState={userState}
        >
            {
                articleData?.data?.map((article, index) => (
                    <tr key={index}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <a href="/" className="relative block">
                                        <img alt={article?.title} src={article?.photo ? stables.UPLOAD_FOLDER_BASE_URL + article?.photo : images.NoImage} className="mx-auto object-cover rounded-lg aspect-square w-10" />
                                    </a>
                                </div>
                                <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">{article?.title}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">
                                {article?.categories?.length > 0 ? article?.categories.slice(0 , 3).map((category , index) => (
                                    `${category?.title}${article?.categories.slice(0 ,3 ).length === index + 1 ? "" : ", " }`
                                )) : "Un categorized"}
                            </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">
                                {new Date(article?.createdAt).toLocaleDateString(
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
                                {article?.tags?.length > 0 ? (
                                    article.tags.map((tag, index) => (
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
                                deleteDataHandler({slug: article?.slug  , token: userState?.userInfo?.token})
                            }} 
                            className='text-red-600 hover-text-red-100 disabled:opacity-70 disabled:cursor-not-allowed bg-red-100 p-2 rounded-lg'>
                                Delete
                            </button>
                            <Link 
                                to={`/admin/userArticle/manage/edit/${article?.slug}`}
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

export default ManageUserArticle