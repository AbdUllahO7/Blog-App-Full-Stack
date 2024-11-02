import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleNews, updateNews } from '../../../../services/index/news';
import toast from 'react-hot-toast';
import { stables } from '../../../../constants';
import ArticleDetailSkeleton from '../../../articleDetail/component/ArticleDetailSkeleton';
import ErrorMessage from '../../../../components/ErrorMessage';
import { FaCamera } from "react-icons/fa";
import MultiSelectTagDropDown from '../../components/select-dropdown/MultiSelectTagDropDown';
import CreatableSelect from 'react-select/creatable';
import { getAllCategories } from '../../../../services/index/postCategories';
import { categoryToOption, filterCategories } from '../../../../utils/multiSelectTagUtils';
import Editor from '../../../../components/editor/Editor';


const promiseOptions = async (inputValue) => {
    const {data: categoriesData} = await getAllCategories();

    return filterCategories(inputValue, categoriesData);
}


function EditNews() {


    const { slug } = useParams();
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [photo, setPhoto] = useState(null);
    const [initialPhoto, setInitialPhoto] = useState(null);
    const userState = useSelector((state => state.user));
    const [body, setBody] = useState(null);
    const [categories, setCategories] = useState(null);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState(null);
    const [newsSlug, setNewsSlug] = useState(slug);
    const [caption, setCaption] = useState("")

    // get the news 
    const { data   , status , isLoading , isError} = useQuery({
        queryKey: ['blog', slug],  // Updated to an array
        queryFn: () => getSingleNews({ slug }),
        refetchOnWindowFocus : false
    });


    // update news 
    const {mutate : mutateUpdateNewsDetail , isLoading :  isLoadingUpdateNewsDetail} = useMutation({
        mutationFn : ({updatedData , slug , token}) => {
            return updateNews({
                updatedData , slug , token
            });

        },
        onSuccess : (data) => {
            queryClient.invalidateQueries(["news", slug]);
            toast.success('News updated successfully');
            navigate(`/admin/news/manage/edit/${data?.slug}` , {replace: true}); // replace : true => the user can not return to previous slug !!  
        },
        onError : (error) => {
            toast.error('News not updated successfully');
            console.log(error);
        }
    })


    // if query is true or false 
    useEffect(() => {
        if (status === 'success') {
            toast.success('News fetched successfully');
            setInitialPhoto(data?.photo);
            setCategories(data?.categories.map((item) => item._id));
            setTitle(data?.title);
            setTags(data?.tags);
            setCaption(data?.caption);

        }else {
            toast.error('Failed to fetch the news');
        }
    }, [status, data]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    }

    const handleUpdateNews = async  ()=> {
        let updatedData = new FormData();
        if(!initialPhoto && photo) {
            updatedData.append('newsPicture', photo);
        }else if(initialPhoto && !photo){
            const urlToObject = async (url) => {
                let response = await fetch(url);
                let blob = await response.blob();
                const file = new File([blob] ,initialPhoto , {type : blob.type} );
                return file;
            };
            const picture = await urlToObject(stables.UPLOAD_FOLDER_BASE_URL + data?.photo);
            updatedData.append('newsPicture', picture);
        }
        updatedData.append('document', JSON.stringify({body , categories , title , tags , slug : newsSlug , caption}));

        mutateUpdateNewsDetail({updatedData , slug , token : userState?.userInfo?.token})
    };


    const handleDeleteImage = () => {
        if(window.confirm('Are you sure you want to delete ?')){
            setInitialPhoto(null);
            setPhoto(null);
        }
    }

    let isNewsDataLoaded = !isLoading && !isError ; 


    return (
        <div>
        {
            isLoading ? (
                <ArticleDetailSkeleton/>
            ) : isError ? <ErrorMessage message="Couldn't fetch the news detail"/> 
            :  <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
                    <article className='flex-1'>

                        <label htmlFor="newsPicture" className='w-full cursor-pointer'>
                            {photo ? (
                                <img src={URL.createObjectURL(photo)} alt={data?.title} className='rounded-xl w-full'/>
                            ) : initialPhoto ? (
                                <img src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo} alt={data?.title} className='rounded-xl w-full'/>
                            ) : (
                                <div className='w-full  min-h-[200px] bg-blue-50/50 flex justify-center items-center'>
                                    <FaCamera className='w-7 h-auto text-primary'/>
                                </div>
                            )}
                        </label>
                        <input type="file"  className='sr-only' id="newsPicture" onChange={handleFileChange}/>

                        <button type='button' 
                        onClick={handleDeleteImage}
                        className='w-fit bg-red-500 text-sm text-white font-semibold rounded-lg px-2 py-1 mt-5'>Delete Image</button>

                            <div className='mt-4 flex gap-2 '>
                                {data?.categories.map((cat) => (
                                    <Link to={`/blog?category=${cat?.name}`} className='text-primary text-sm font-roboto inline-block'>
                                                {cat?.name}     
                                    </Link>
                                )) }
                            </div>
                            {/* title */}
                            <div className='d-form-control w-full'>
                                <label htmlFor="title" className='d-label '>
                                        <span className='d-label-text'>Title</span>
                                </label>
                                <input 
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='title'
                                    id="title"
                                    value= {title} 
                                    className='d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-roboto font-medium  
                                    text-dark-hard' />
                            </div>
                               {/* caption */}
                               <div className='d-form-control w-full'>
                                <label htmlFor="caption" className='d-label '>
                                        <span className='d-label-text'>Caption</span>
                                </label>
                                <input 
                                    onChange={(e) => setCaption(e.target.value)}
                                    placeholder='caption'
                                    id="caption"
                                    value= {caption} 
                                    className='d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-roboto font-medium  
                                    text-dark-hard' />
                            </div>
                              {/* slug */}
                                <div className='d-form-control w-full'>
                                <label htmlFor="slug" className='d-label '>
                                        <span className='d-label-text'>Slug</span>
                                </label>
                                <input 
                                    onChange={(e) => setNewsSlug(e.target.value.replace(/\s+/g , "-").toLowerCase())}
                                    placeholder='News Slug'
                                    id="slug"
                                    value= {newsSlug} 
                                    className='d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-roboto font-medium  
                                    text-dark-hard' />
                            </div>
                            {/* categories */}
                                <label className='d-label '>
                                        <span className='d-label-text'>Categories</span>
                                </label>
                                <div className='mb-5 mt-2'>
                                    { isNewsDataLoaded && <MultiSelectTagDropDown 
                                        loadOptions={promiseOptions}
                                        defaultValue={data?.categories?.map((categoryToOption))}
                                        onChange={(newValue)=> setCategories(newValue.map(
                                                (item) => item.value 
                                        ))}
                                    /> } 
                                </div>
                                {/* Tags */}
                                <label className='d-label '>
                                        <span className='d-label-text'>Tags</span>
                                </label>
                                <div className='mb-5 mt-2'>
                                    { isNewsDataLoaded && 
                                        <CreatableSelect
                                        className='relative z-20'
                                        isMulti
                                        defaultValue={data?.tags?.map((tag) => ({
                                            value : tag,
                                            label : tag
                                        }))}
                                        onChange={(newValue)=> setTags(newValue.map(
                                                (item) => item.value 
                                        ))}
                                    /> } 
                                </div>
                                {/* Body  */}
                                <div className='w-full'>
                                    {isNewsDataLoaded && (
                                        <Editor
                                        content={data?.body}
                                        editable={true}
                                        onDataChange = {(data) => {
                                            setBody(data);
                                        }}
                                        />
                                    )}

                                </div>

                            <button type='button' 
                                disabled={isLoadingUpdateNewsDetail}
                                onClick={handleUpdateNews} 
                                className='w-fit bg-green-500 text-white font-semibold rounded-lg px-4 disabled:cursor-not-allowed disabled:opacity-70'>
                                    Update
                            </button>
        
                    </article>
    
            </section>
        }

    </div>
    )
}

export default EditNews