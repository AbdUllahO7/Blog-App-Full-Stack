import React from 'react'
import { FaTwitter   , FaFacebook  , FaReddit , FaWhatsapp} from "react-icons/fa";

function SocialShareButtons({url , title}) {
    return (
        <div className='w-full flex justify-between '>
            <a href={`https://www.facebook.com/dialog/share?app_id=843398907735423&display=popup&href=${url}`} target='_blank' rel = "noreferrer">
                <FaFacebook className="w-10 h-auto text-[#3b5998]" />
            </a>
            <a href={`https://twitter.com/intent/tweet?url= ${url}`} target='_blank' rel = "noreferrer">
                <FaTwitter className="w-10 h-auto text-[#00acee]" />
            </a>
            <a href={`https://www.reddit.com/submit?url=${url}&title=${title}`} target='_blank' rel = "noreferrer">
                <FaReddit className="w-10 h-auto text-[#ff4500]" />
            </a>
            <a href={`https://api.whatsapp.com/send/?text=${url}`} target='_blank' rel = "noreferrer">
                <FaWhatsapp className="w-10 h-auto text-[#25d366]" />
            </a>
        </div>
    )
}

export default SocialShareButtons