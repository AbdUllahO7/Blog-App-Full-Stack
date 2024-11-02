import React, {  useState } from 'react'
import CommentForm from './CommentForm'
import Comment from './Comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, deleteComment, updateComment } from '../../services/index/comments';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function CommentsContainer({comments ,className , logginedUserId , postSlug}) {
    const queryClient = useQueryClient()
    const [affectedComment, setAffectedComment] = useState(null)
    const userState = useSelector(state=> state.user)

    // create new Comment 
    const {mutate : mutateNewComment , isLoading : isLoadingNewComment} = useMutation({
        mutationFn : ({token ,desc , slug , parent  , replayOnUser}) => {
            return createComment({token ,desc , slug , parent  , replayOnUser});
        },
        onSuccess : (data) => {
            toast.success("Your comment is sent , it will bve visible after the confirmation of the Admin ");
        },
        onError : (error) => {
            toast.error(error.message)
            console.log(error)
        }
    });
    // update comment
    const {mutate : mutateUpdateComment } = useMutation({
        mutationFn : ({token ,desc , commentId}) => {
            return updateComment({token ,desc ,commentId});
        },
        onSuccess : (data) => {
            toast.success("Your comment is updated successfully ");
            queryClient.invalidateQueries(["blog" , postSlug])
        },
        onError : (error) => {
            toast.error(error.message)
            console.log(error)
        }
    })
    // delete comment
    const {mutate : mutateDeleteComment } = useMutation({
        mutationFn : ({token  , commentId}) => {
            return deleteComment({token  ,commentId});
        },
        onSuccess : (data) => {
            toast.success("Your comment is deleted successfully ");
            queryClient.invalidateQueries(["blog" , postSlug])
        },
        onError : (error) => {
            toast.error(error.message)
            console.log(error)
        }
    })

    // add new comments to comment.js 
    const addCommentHandler = (value , parent = null , replayOnUser = null) => {
        mutateNewComment({desc : value, parent, replayOnUser , token: userState?.userInfo?.token , slug : postSlug})
        setAffectedComment(null)
    }

    const updateCommentHandler = (value, commentId) => {
        mutateUpdateComment({token : userState?.userInfo?.token , desc : value , commentId : commentId})
        setAffectedComment(null);
    }

    const deleteCommentHandler = (commentId) => {
        mutateDeleteComment({token : userState?.userInfo?.token , commentId : commentId})
    }

    return (
        <div className={`${className}`}>

            <CommentForm
                    btnLabel="Send"
                    formSubmitHandler={(value) => addCommentHandler(value)}
                    loading={isLoadingNewComment}
                />                
            <div className='space-y-4 mt-8' >
                        {comments?.map((comment) => (
                            <Comment key={comment._id} comment={comment} 
                            addCommentHandler = {addCommentHandler}  
                            logginedUserId={logginedUserId} 
                            affectedComment = {affectedComment} 
                            setAffectedComment = {setAffectedComment}
                            updateComment = {updateCommentHandler}
                            deleteComment = {deleteCommentHandler}
                            replies = {comment?.replies}
                            />
                        ) )}
                </div>
        </div>
    )
}

export default CommentsContainer