import React, { useEffect } from 'react'
import Header from './components/header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../services/index/users';
import toast from 'react-hot-toast';

function AdminLayout() {

    const userState = useSelector(state => state.user)
    const navigate = useNavigate()
    const {data : profileData , isLoading : profileIsLoading , status  } = useQuery({
        queryKey: ['profile'],
        queryFn: () => {
            return getUserProfile( {token : userState.userInfo.token});
        },
    });

    useEffect(() => {
        if (status === 'success') {
            if(!profileData?.admin) {
                navigate("/")
                toast.error("Your are not allowed to access this profile")
            }
        }else {
            toast.error("Failed to load profile")
            navigate("/")
        }
    }, [status, profileData, navigate]);

    if(profileIsLoading) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <h3 className='text-2xl text-slate-700'>Loading....</h3>
            </div>
        )
    }

    return (
        <div className='flex flex-col h-auto lg:flex-row'>
                <Header/>
                <main className="bg-[#f9f9f9] flex-1 p-4 lg:p-6">
                    <Outlet/>
                </main>
        </div>
    )
}

export default AdminLayout;