import React  from 'react';
import { images, stables } from '../../../../constants';
import { Link } from 'react-router-dom';
import { useDataTable } from '../../../../hooks/useDataTable';
import { deletePost, getAllPosts } from '../../../../services/index/posts';
import DataTable from '../../components/DataTable';



function ManagePost() {

    
const  {
    userState,
    currentPage , 
    searchKeyword,
    data : postData, 
    setCurrentPage,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    submitSearchKeywordHandler,
    deleteDataHandler,
    searchKeywordHandler,
    } =  useDataTable({
        dataQueryFn : () => getAllPosts(searchKeyword , currentPage),
        dataQueryKey : "posts",
        deleteDataMessage : "Post is deleted",
        mutateDeleteFn : ({slug , token}) => {
            return deletePost({slug : slug, token : token});
        } 
    });

    return (
        <DataTable
        pageTitle="Mange Posts"
        dataLisName="Posts"
        searchInputPlaceHolder="Post Title..."
        searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
        searchKeywordOnChangeHandler={searchKeywordHandler}
        searchKeyword={searchKeyword}
        tableHeaderTitleList={['Title' , "category" , "CreatedAt" , "Tags", "Actions"]}
        isLoading={isLoading}
        isFetching={isFetching}
        data = {postData?.data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headers={postData?.headers}
        userState={userState}
        >
            {
                postData?.data?.map((post, index) => (
                    <tr key={index}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <a href="/" className="relative block">
                                        <img alt={post?.title} src={post?.photo ? stables.UPLOAD_FOLDER_BASE_URL + post?.photo : images.NoImage} className="mx-auto object-cover rounded-lg aspect-square w-10" />
                                    </a>
                                </div>
                                <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">{post?.title}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">
                                {post?.categories?.length > 0 ? post?.categories.slice(0 , 3).map((category , index) => (
                                    `${category?.title}${post?.categories.slice(0 ,3 ).length === index + 1 ? "" : ", " }`
                                )) : "Un categorized"}
                            </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">
                                {new Date(post?.createdAt).toLocaleDateString(
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
                                {post?.tags?.length > 0 ? (
                                    post.tags.map((tag, index) => (
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
                                deleteDataHandler({slug: post?.slug  , token: userState?.userInfo?.token})
                            }} 
                            className='text-red-600 hover-text-red-100 disabled:opacity-70 disabled:cursor-not-allowed bg-red-100 p-2 rounded-lg'>
                                Delete
                            </button>
                            <Link 
                            to={`/admin/posts/manage/edit/${post?.slug}`}
                            className="text-green-600 hover:text-green-900 bg-green-100 p-2 rounded-lg"
                            >
                            edit
                            </Link>
                        </td>
                    </tr>
                ))

            }
        </DataTable>
    );
}

export default ManagePost;
