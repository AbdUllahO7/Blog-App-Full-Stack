import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";

function Search({
    className,
    OnSearchKeyword
}) {
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        OnSearchKeyword({searchKeyword})
    }

    return (
        <form onSubmit= {handleSubmit} className={`flex flex-col gap-y-2.5 ${className} relative`}>
        <div className='relative'>
            <FaSearch 
            className='absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]'/>
            <input 
            className='placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none 
            shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:py-4 ' 
            placeholder='Search Articles' type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value) }
            ></input>
        </div>

        <button 
        type="submit"
        className=' w-full bg-primary text-white font-semibold rounded-lg 
        px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2 '>Search</button>


    </form>

    )
}

export default Search