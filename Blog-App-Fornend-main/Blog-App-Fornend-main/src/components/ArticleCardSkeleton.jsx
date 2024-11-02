import React from 'react'

function ArticleCardSkeleton( {
    className,
}) {
    return (
        <div className={`rounded-xl overflow-hidden shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]
            ${className} animate-pulse`}>

                {/* image */}
                <div className='w-full aspect-video bg-slate-300'/>


            <div className='p-5'>
                {/* title */}
                <div className='w-56 h-2 mt-4 bg-slate-400 rounded-lg'/>

                {/* caption */}
                <div className='w-24 h-2 mt-4 bg-slate-400 rounded-lg'/>

                    <div className='flex justify-between flex-nowrap items-center mt-6'>
                        <div className='flex items-center gap-x-2 md:gap-x-2.5'>
                            
                            {/* profile image */}
                        <div className='w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-300 ' />

                            <div className='flex flex-col '>
                                
                                {/* users name */}
                            <div className='w-24 h-2  bg-slate-400 rounded-lg'/>
                            {/* verified status */}
                            <div className='w-16 h-2 mt-2 bg-slate-400 rounded-lg'/>

                            </div>
                        </div>
                        {/*  date */}
                        <div className='w-10 h-2 mt-4 bg-slate-400 rounded-lg'/>
                    </div>
            </div>

        </div>
    )
}

export default ArticleCardSkeleton