import React, { useState } from 'react'
import DataTable from '../../components/DataTable';
import { useDataTable } from '../../../../hooks/useDataTable';
import { createCategory, deleteCategories, getAllCategories } from '../../../../services/index/postCategories';

import { Link} from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function Categories() {

    const [categoryTitle, setCategoryTitle] = useState("");
    const queryClient =  useQueryClient()

    // create new category 
    const { mutate : mutateCreateCategory , isLoading : isLoadingCreateCategory } = useMutation({
        mutationFn: ({ token , title }) => {
            return createCategory({ token , title });
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["categories"])
            toast.success("Category added  successfully  ");

        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
        });


    const  {
    userState,
    currentPage , 
    searchKeyword,
    data : categoriesData, 
    setCurrentPage,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    submitSearchKeywordHandler,
    deleteDataHandler,
    searchKeywordHandler,
        } =  useDataTable({
            dataQueryFn : () => getAllCategories(searchKeyword , currentPage),
            dataQueryKey : "categories",
            deleteDataMessage : "category is deleted",
            mutateDeleteFn : ({slug , token}) => {
                return deleteCategories({slug : slug, token : token});
            } 
    });

    const handleCreateNewCategory = ()=> {
        mutateCreateCategory({token: userState?.userInfo?.token ,title : categoryTitle })
    }

    return (
        <div className='grid grid-cols-12 gap-x-4'>

            <div className='col-span-4 py-8'>
                <h4 className='text-lg leading-tight'>Add New Category</h4>
                <div className='d-form-control w-full mt-6'>
                        <input 
                            onChange={(e) => setCategoryTitle(e.target.value)}
                            placeholder='category Title'
                            value= {categoryTitle} 
                            className='d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-roboto font-medium  
                            text-dark-hard' />
                        <button type='button' 
                                    disabled={isLoadingCreateCategory}
                                    onClick={handleCreateNewCategory} 
                                    className='w-fit bg-green-500 mt-3 text-white font-semibold rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-70'>
                                        Add Category 
                        </button>
                </div>
            </div>

            <div className='col-span-8'>
                <DataTable
                pageTitle="Mange Categories"
                dataLisName="Categories"
                searchInputPlaceHolder="Category Title..."
                searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
                searchKeywordOnChangeHandler={searchKeywordHandler}
                searchKeyword={searchKeyword}
                tableHeaderTitleList={['Title' ,  "CreatedAt" , "Actions"]}
                isLoading={isLoading}
                isFetching={isFetching}
                data = {categoriesData?.data}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                headers={categoriesData?.headers}
                userState={userState}
                >
                    {
                        categoriesData?.data?.map((category, index) => (
                            <tr key={index}>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <div className="flex items-center">
                                    
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">{category?.title}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p className="text-gray-900 whitespace-no-wrap bg-gray-100 p-2 rounded-lg">
                                        {new Date(category?.createdAt).toLocaleDateString(
                                            "en-US",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )}
                                    </p>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                                    <button 
                                    disabled={isLoadingDeleteData}
                                    type='button'
                                    onClick={() => {
                                        deleteDataHandler({slug: category?._id  , token: userState?.userInfo?.token})
                                    }} 
                                    className='text-red-600 hover-text-red-100 disabled:opacity-70 disabled:cursor-not-allowed bg-red-100 p-2 rounded-lg'>
                                        Delete
                                    </button>
                                    <Link 
                                    to={`/admin/categories/manage/edit/${category?._id}`}
                                    className="text-green-600 hover:text-green-900 bg-green-100 p-2 rounded-lg"
                                    >
                                    edit
                                    </Link>
                                </td>
                            </tr>
                        ))

                    }
                    </DataTable>
            </div>
        </div>
    )
}

export default Categories