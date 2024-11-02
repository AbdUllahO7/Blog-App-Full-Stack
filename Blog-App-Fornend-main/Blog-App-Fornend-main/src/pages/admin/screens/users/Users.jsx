import React from 'react'
import { useDataTable } from '../../../../hooks/useDataTable';
import { deleteUser, getAllUsers, updateProfile } from '../../../../services/index/users';
import { images, stables } from '../../../../constants';
import DataTable from '../../components/DataTable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function Users() {
    const queryClient =  useQueryClient();

    const  {
        userState,
        currentPage , 
        searchKeyword,
        data : userData, 
        setCurrentPage,
        isLoading,
        isFetching,
        isLoadingDeleteData,
        submitSearchKeywordHandler,
        deleteDataHandler,
        searchKeywordHandler,
        } =  useDataTable({
            dataQueryFn : () => getAllUsers(userState?.userInfo?.token , searchKeyword , currentPage),
            dataQueryKey : "posts",
            deleteDataMessage : "User is deleted",
            mutateDeleteFn : ({slug , token}) => {
                return deleteUser({slug : slug, token : token});
            } 
        });

        
   // update user 
    const {mutate : mutateUpdateUserDetail , isLoading :  isLoadingUpdateUserDetail} = useMutation({
        mutationFn : ({ isAdmin , userId}) => {
            return updateProfile({token : userState?.userInfo?.token , userData : {admin : isAdmin} , userId : userId});

        },
        onSuccess : (data) => {
            queryClient.invalidateQueries(["users"]);
            toast.success('Post updated successfully');

        },
        onError : (error) => {
            toast.error('Post not updated successfully');
            console.log(error);
        }
    })

    const handleAdminCheck = (event , userId) => {

        const initialCheckValue = !event.target.checked;

        if(window.confirm("Are you sure you want to check your account for admin access?")){
            mutateUpdateUserDetail({isAdmin: event.target.checked , userId})
        }else {
            event.target.checked = initialCheckValue;
        }

    }

        


    return (
        <DataTable
        pageTitle="Mange Posts"
        dataLisName="Posts"
        searchInputPlaceHolder="Users Email..."
        searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
        searchKeywordOnChangeHandler={searchKeywordHandler}
        searchKeyword={searchKeyword}
        tableHeaderTitleList={['Name' , "Email" , "Created At" , "is verified", "is Admin" , "Actions"]}
        isLoading={isLoading}
        isFetching={isFetching}
        data = {userData?.data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headers={userData?.headers}
        userState={userState}
        >
            {
                userData?.data?.map((user, index) => (
                    <tr key={index}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <a href="/" className="relative block">
                                        <img alt={user?.name} src={user?.avatar ? stables.UPLOAD_FOLDER_BASE_URL + user?.avatar : images.NoImage} className="mx-auto object-cover rounded-lg aspect-square w-10" />
                                    </a>
                                </div>
                                <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">{user?.name}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">
                                {user?.email}
                            </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">
                                {new Date(user?.createdAt).toLocaleDateString(
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
                        <p className="w-fit text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">
                                {user?.verified ? "✅" : "❌"}
                            </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="w-fit text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">
                                <input type="checkbox"
                                onChange={(event) => handleAdminCheck(event , user._id) }
                                defaultChecked={user.admin}  
                                disabled = {isLoadingUpdateUserDetail}            
                                className="d-checkbox disabled:bg-orange-400 disabled:opacity-100 checked:bg-[url('../public/images/check.png')] bg-cover checked:disabled:bg-none"
                                />
                            </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                            <button 
                            disabled={isLoadingDeleteData}
                            type='button'
                            onClick={() => {
                                deleteDataHandler({slug: user?._id  , token: userState?.userInfo?.token})
                            }} 
                            className='text-red-600 hover-text-red-100 disabled:opacity-70 disabled:cursor-not-allowed bg-red-100 p-2 rounded-lg'>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))

            }
        </DataTable>
    )
}
