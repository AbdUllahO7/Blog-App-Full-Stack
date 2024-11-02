import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../../../constants";
import { IoMdClose } from "react-icons/io";
import { RiMenu2Line } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import { FaComments, FaUser } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import NavItem from "./NavItem";
import NavItemDown from "./NavItemDown";
import { useWindowSize } from "@uidotdev/usehooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { createPost } from "../../../../services/index/posts";
import { createNewNews } from "../../../../services/index/news";
import { createNewUserArticle } from "../../../../services/index/userArticle";




function Header() {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [activeNavName, setActiveNavName] = useState("dashboard");
    const windowSize = useWindowSize()
    const queryClient =  useQueryClient()
    const navigate = useNavigate()
    const userState = useSelector((state => state.user))

    const toggleMenuHandler = ()=> {
        setIsMenuActive(!isMenuActive);
    }

    useEffect(() => {
        if(windowSize.width < 1024) {
            setIsMenuActive(false);
        }else {
            setIsMenuActive(true);
        }
    } , [windowSize.width])

    // create new post 
    const { mutate : mutateCreatePost , isLoading : isLoadingCreatePost } = useMutation({
        mutationFn: ({ token }) => {
            return createPost({ token})
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["posts"])
            toast.success("Post added  successfully edit it Now ! ");
            console.log(data)
            navigate(`/admin/posts/manage/edit/${data?.slug}`)
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
        });

    const { mutate : mutateCreateNews , isLoading : isLoadingCreateNews } = useMutation({
        mutationFn: ({ token }) => {
            return createNewNews({ token})
        }, 
        onSuccess: (data) => {
            queryClient.invalidateQueries(["news"])
            toast.success("news added  successfully edit it Now ! ");
            console.log(data)
            navigate(`/admin/news/manage/edit/${data?.slug}`)
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
        });


        const { mutate : mutateCreateUserArticle , isLoading : isLoadingCreateUserArticle } = useMutation({
            mutationFn: ({ token }) => {
                return createNewUserArticle({ token})
            }, 
            onSuccess: (data) => {
                queryClient.invalidateQueries(["userArticle"])
                toast.success("User Article added  successfully edit it Now ! ");
                console.log(data)
                navigate(`/admin/userArticle/manage/edit/${data?.slug}`)
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
            });

    const handleCreateNewPost = ({token})=> {
        mutateCreatePost({token: token})
    }

    const handleCreateNewNews = ({token})=> {
        mutateCreateNews({token: token})
    }

    const handleCreateNewUserArticle = ({token})=> {
        mutateCreateUserArticle({token: token})
    }


    return (
        <header className="flex h-full w-full items-cent4er justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
        {/* logo */}
        <Link to="/">
            <img src={images.Logo} alt="logo" className="w-16 lg:hidden" />
        </Link>
        {/* menu burger icon  */}
        <div className="cursor-pointer lg:hidden">
            {isMenuActive ? (
                <IoMdClose className="w-6 h-6 " onClick={toggleMenuHandler}/>
                ) : (
                <RiMenu2Line className="w-6 h-6 " onClick={toggleMenuHandler} />
            )}
        </div>

        {/* Side Bar container */}
        {isMenuActive && (
            <div className="fixed inset-0  lg:static lg:h-full lg:w-full ">
                {/* underlay  */}
                <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={toggleMenuHandler}/>
                {/* Side bar */}
                <div className="fixed top-0 bottom-0 lef-0 z-50 w-3/4 overflow-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6">
                    <Link to="/" >
                    <img src={images.Logo} alt="logo" className="w-16 "/>
                    
                    </Link>
                    <h4 className="mt-10 font-bold text-[#c7c7c7] ">MAIN MENU </h4>
                    {/* menu items  */}
                    <div className="mt-6 flex flex-col gap-y-[0.563rem] ">

                                <NavItem 
                                    title="Dashboard"
                                    link="/admin"
                                    icon={<AiFillDashboard className="text-xl"/>}
                                    name="dashboard"
                                    activeNavName={activeNavName}
                                    setActiveNavName = {setActiveNavName}
                                />
                                <NavItem 
                                    title="Comments"
                                    link="/admin/comments"
                                    icon={<FaComments className="text-xl"/>}
                                    name="comments"
                                    activeNavName={activeNavName}
                                    setActiveNavName = {setActiveNavName}
                                />
                                <NavItem 
                                    title="Users"
                                    link="/admin/users/manage"
                                    icon={<FaUser className="text-xl"/>}
                                    name="users"
                                    activeNavName={activeNavName}
                                    setActiveNavName = {setActiveNavName}
                                />
                                <NavItemDown
                                    title="Posts"
                                    icon={<MdPostAdd className="text-xl"/>}
                                    name="posts"
                                    activeNavName={activeNavName}
                                    setActiveNavName = {setActiveNavName}
                                >
                                    <Link to="/admin/posts/manage">
                                        Manage All Posts
                                    </Link>

                                    <button  className="text-start disabled:opacity-70 disabled:cursor-not-allowed"   
                                    disabled= {isLoadingCreatePost}
                                    onClick={() => {
                                            handleCreateNewPost({ token: userState?.userInfo?.token})
                                        }} >
                                        Add New Post</button>
                                    <Link to="/admin/categories/manage">
                                        Categories
                                    </Link>
                                    </NavItemDown>
                                    {/*  */}
                                    <NavItemDown
                                    title="News"
                                    icon={<MdPostAdd className="text-xl"/>}
                                    name="news"
                                    activeNavName={activeNavName}
                                    setActiveNavName = {setActiveNavName}
                                >
                                    <Link to="/admin/news/manage">
                                        Manage All news
                                    </Link>

                                    <button  className="text-start disabled:opacity-70 disabled:cursor-not-allowed"   
                                    disabled= {isLoadingCreateNews}
                                    onClick={() => {
                                            handleCreateNewNews({ token: userState?.userInfo?.token})
                                        }} >
                                        Add New News</button>
                                    </NavItemDown>

                                    <NavItemDown
                                    title="User Article"
                                    icon={<MdPostAdd className="text-xl"/>}
                                    name="UserArticle"
                                    activeNavName={activeNavName}
                                    setActiveNavName = {setActiveNavName}
                                >
                                    <Link to="/admin/userArticle/manage">
                                        Manage All User Article
                                    </Link>

                                    <button  className="text-start disabled:opacity-70 disabled:cursor-not-allowed"   
                                    disabled= {isLoadingCreateUserArticle}
                                    onClick={() => {
                                        handleCreateNewUserArticle({ token: userState?.userInfo?.token})
                                        }} >
                                        Add New Article</button>
                                    </NavItemDown>


                    </div>
                </div>
            </div>
        )  }
        </header>
    );
}

export default Header;
