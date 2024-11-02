import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { getSingleCategory, updateCategories } from '../../../../services/index/postCategories';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditCategories() {
    const { slug } = useParams();
    const [categoryTitle, setCategoryTitle] = useState("");
    const queryClient =  useQueryClient();
    const navigate = useNavigate()
    const userState = useSelector((state => state.user));

     // get the category
     const { data   , status , isLoading , isError} = useQuery({
        queryKey: ['categories', slug],  // Updated to an array
        queryFn: () => getSingleCategory({ slug }),
        refetchOnWindowFocus : false
    });

    // if query is true or false 
    useEffect(() => {
        if (status === 'success') {
            toast.success('Category fetched successfully');
            setCategoryTitle(data?.title);

        }else {
            toast.error('Failed to fetch the Category');
        }
    }, [status, data]);



   // update categories 
    const {mutate : mutateUpdateCategoriesDetail , isLoading :  isLoadingUpdateCategoriesDetail} = useMutation({
        mutationFn : ({title , slug , token}) => {
            return updateCategories({
                title , slug , token
            });

        },
        onSuccess : (data) => {
            queryClient.invalidateQueries(["categories", slug]);
            toast.success('Post updated successfully');
            navigate(`/admin/categories/manage/edit/${data?._id}` , {replace: true}); // replace : true => the user can not return to previous slug !!  

        },
        onError : (error) => {
            toast.error('Post not updated successfully');
            console.log(error);
        }
    })

    const handleUpdateCategory = ()=> {
        if(!categoryTitle) return;
        mutateUpdateCategoriesDetail({
            title : categoryTitle,
            slug : slug,
            token :  userState?.userInfo?.token // get token from local storage
        })
    }


    return (
        <div className='col-span-4 py-8'>
                <h4 className='text-lg leading-tight'>Update Category</h4>
                <div className='d-form-control w-full mt-6'>
                        <input 
                            onChange={(e) => setCategoryTitle(e.target.value)}
                            placeholder='category Title'
                            value= {categoryTitle} 
                            className='d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-roboto font-medium  
                            text-dark-hard' />
                        <button type='button' 
                                    disabled={isLoadingUpdateCategoriesDetail || isLoading || isError}
                                    onClick={handleUpdateCategory} 
                                    className='w-fit bg-green-500 mt-3 text-white font-semibold rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-70'>
                                        Update Category 
                        </button>
                </div>
            </div>
)
}

export default EditCategories