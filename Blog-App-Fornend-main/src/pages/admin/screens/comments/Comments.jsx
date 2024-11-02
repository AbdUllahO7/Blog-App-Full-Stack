import React from 'react'
import { useDataTable } from '../../../../hooks/useDataTable';
import { deleteComment, getAllComments, updateComment } from '../../../../services/index/comments';
import DataTable from '../../components/DataTable';
import { images, stables } from '../../../../constants';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function Comments() {


 

        
const  {
    userState,
    currentPage , 
    searchKeyword,
    data : commentsData, 
    setCurrentPage,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    submitSearchKeywordHandler,
    deleteDataHandler,
    searchKeywordHandler,
    queryClient,
    } =  useDataTable({
        dataQueryFn : () => getAllComments(userState?.userInfo?.token,searchKeyword , currentPage),
        dataQueryKey : "comments",
        deleteDataMessage : "comment is deleted",
        mutateDeleteFn : ({slug , token}) => {
            return deleteComment({commentId : slug, token});
        } 
    });

    const {mutate : mutateUpdateCommentCheck , isLoading : isLoadingUpdateCommentCheck} = useMutation({
        mutationFn: ({ commentId, token , check}) => {
            return updateComment({ commentId, token , check})
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['comments'])
            toast.success(data?.check ? 'Comment deleted successfully' : "comment is not approved");
        },
        onError: () => {
            toast.error('Failed to delete comment');
        }
    })

    return (
        <DataTable
        pageTitle="Mange Comments"
        dataLisName="Comments"
        searchInputPlaceHolder="Search Comments..."
        searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
        searchKeywordOnChangeHandler={searchKeywordHandler}
        searchKeyword={searchKeyword}
        tableHeaderTitleList={['Author' , "Comment" , "In Responded to" , "Created At", "Actions"]}
        isLoading={isLoading}
        isFetching={isFetching}
        data = {commentsData?.data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headers={commentsData?.headers}
        userState={userState}
        >
            {
                commentsData?.data?.map((comment, index) => (
                    <tr key={index}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <a href="/" className="relative block">
                                        <img alt={comment?.title} src={comment?.user?.avatar ? stables.UPLOAD_FOLDER_BASE_URL + comment?.user?.avatar : images.NoImage} className="mx-auto object-cover rounded-lg aspect-square w-10" />
                                    </a>
                                </div>
                                <div className="ml-3">
                                    
                                    <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">{comment?.user?.name}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-5 py-5 text-sm  border-b border-gray-200 bg-gray-100 p-2  rounded-lg">
                        {comment?.replayOnUser  !==null &&(
                                            <p className="whitespace-no-wrap bg-gray-100  text-gray-400 rounded-lg">
                                                In Replay To{" "}
                                                <Link to={`/blog/${comment?.post?.slug}/#comment-${comment?._id}`} 
                                                className='text-blue-500'>
                                                    { comment?.replayOnUser?.name}
                                                </Link>
                                            </p>

                                        )}
                            <p className="text-gray-900 whitespace-no-wrap ">
                                {comment?.desc}
                            </p>
                        </td>
                        <td className="px-5 py-5 text-sm  border-b border-gray-200 bg-white p-2  rounded-lg">
                            <p className="whitespace-no-wrap  text-gray-400 rounded-lg">
                                <Link to={`/blog/${comment?.post?.slug}`} 
                                className='text-blue-500'>
                                    {comment?.post?.title}
                                </Link>
                            </p>
                        
                        </td>
                        <td className="px-5 py-5 text-sm  border-b bg-white border-gray-200 p-2  rounded-lg">
                            <p className="whitespace-no-wrap  text-gray-400 rounded-lg">
                            {new Date(comment?.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                            </p>
                        
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                            <button 
                            disabled={isLoadingDeleteData}
                            type='button'
                            onClick={() => {
                                mutateUpdateCommentCheck({commentId: comment?._id, token: userState?.userInfo?.token , check:comment?.check ? false : true})
                            }} 
                            className={`${comment?.check ? "text-yellow-600 hover:text-yellow-900" : "text-green-600 hover:text-green-900"} 
                                    disabled:opacity-70 disabled:cursor-not-allowed bg-gray-100 p-2 rounded-lg `}>
                                    {comment?.check ? "Un Approve" : "Approve"}
                            </button>
                            <button 
                            disabled={isLoadingDeleteData}
                            type='button'
                            onClick={() => {
                                deleteDataHandler({slug: comment?._id  , token: userState?.userInfo?.token})
                            }} 
                            className='text-red-600 hover-text-red-100 disabled:opacity-70 disabled:cursor-not-allowed bg-red-100 p-2 rounded-lg'>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))

            }
        </DataTable>
    );
}

export default Comments;