import React, { useEffect } from 'react'
import MainLayout from '../../components/MainLayout'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { signup } from '../../services/index/users'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { userActions} from '../../store/reducers/userReducers'

function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user)
    
    const {mutate , isLoading}  =   useMutation({
        mutationFn : ({name , email , password}) => {
            return signup({name , email , password});
        },
        onSuccess : (data) => {
            dispatch(userActions.setUserInfo(data))
            localStorage.setItem('account', JSON.stringify(data))
            toast.success("Registration successful ");

        },
        onError : (error) => {
            toast.error(error.message)
            console.log(error)
        }
    })

    useEffect(() => {
        if(userState.userInfo) {
            navigate("/")
        }
    }, [navigate, userState.userInfo])

    const {register , handleSubmit , formState : {errors , isValid}  , watch} = useForm({
        defaultValues : {
            name : '' , 
            email : '', 
            password : '',
            confirmPassword : '',
        },
        mode: "onchange",
    },)

    const submitHandler = (data) => {
        console.log(data)
        const {name , email , password} = data ; 
        mutate({name : name, email : email, password : password})
    }

    const password = watch('password');

    return <MainLayout>
        <section className='container mx-auto px-5 py-10'>
            <div className='w-full max-w-sm mx-auto'>
                <h1 className='font-roboto text-2xl font-bold text-center text-dark-hard mb-8'>Sign Up</h1>
                <form onSubmit = {handleSubmit(submitHandler)}>
                    <div className='flex flex-col mb-6 w-full'>
                        <label htmlFor="name" className='text-[#5a7184] font-semibold block'>Name</label>
                        <input type="text"  name="" id="name" placeholder='Enter name' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border  ${errors.name ? "border-red-500" : "border-[#c3cad9]"}`} 
                        {...register("name" , {
                            minLength : {value : 1 , message : 'Name length must be at least 1 character '},
                            required : {value : true , message : 'Name is required'}
                            })} 
                            />
                            {errors.name?.message && (
                                <p className='text-red-500 text-sm mt-1'>{errors.name?.message}</p>
                            )}
                    </div>
                    <div className='flex flex-col mb-6 w-full'>
                        <label htmlFor="email" className='text-[#5a7184] font-semibold block'>Email</label>
                        <input type="text"  name="" id="email" placeholder='Enter email' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border  ${errors.name ? "border-red-500" : "border-[#c3cad9]"}`} 
                        {...register("email" , {
                            pattern : {
                                value : '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
                                message : 'Please enter a valid email'
                            },
                            required : {value : true , message : 'email is required'}
                            })} 
                            />
                            {errors.email?.message && (
                                <p className='text-red-500 text-sm mt-1'>{errors.email?.message}</p>
                            )}                    
                            </div>
                    <div className='flex flex-col mb-6 w-full'>
                        <label htmlFor="password" className='text-[#5a7184] font-semibold block'>Password</label>
                        <input type="password"  name="" id="password" placeholder='Enter password' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border  ${errors.name ? "border-red-500" : "border-[#c3cad9]"}`} 
                        {...register("password" , {
                            minLength : {value : 6 , message : 'password length must be at least 6 character '},
                            required : {value : true , message : 'password is required'}
                            })} 
                            />
                            {errors.password?.message && (
                                <p className='text-red-500 text-sm mt-1'>{errors.password?.message}</p>
                            )}                                        
                    </div>
                    <div className='flex flex-col mb-6 w-full'>
                        <label htmlFor="confirmPassword" className='text-[#5a7184] font-semibold block'>confirm Password</label>
                        <input type="password"  name="" id="confirmPassword" placeholder='Enter confirmPassword' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border  ${errors.name ? "border-red-500" : "border-[#c3cad9]"}`} 
                        {...register("confirmPassword" , {
                            validate : (value) => {
                                if(value !== password) {
                                    return "Passwords do not match"
                                }
                            },
                            message : 'Passwords do not match',  // or return your own message
                            required : {value : true , message : 'confirm Password is required'}
                            })} 
                            />
                            {errors.confirmPassword?.message && (
                                <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword?.message}</p>
                            )}                                                  
                    </div>
                    <button disabled = {!isValid || isLoading} type='submit' className='bg-primary text-white font-old text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed'>
                        Register 
                    </button>
                    <p className='text-sm font-semibold text-[#5a7184]'>You have an account? 
                        <Link to="/login" className='text-sm font-semibold text-primary ml-2'>
                                Login now
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    </MainLayout>
}

export default RegisterPage