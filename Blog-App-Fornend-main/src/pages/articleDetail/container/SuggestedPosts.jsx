import React from "react";
import { Link } from "react-router-dom";
import { images, stables } from "../../../constants";

const SuggestedPosts = ({ className, header, posts = [], tags }) => {

    return (
        <div
        className={`w-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] rounded-lg p-4 ${className}`}
        >
        <h2 className="font-roboto font-medium text-dark-hard md:text-xl">
            {header}
        </h2>
        <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
            {posts.map((item) => (
            <div
                key={item?.id}
                className="flex space-x-3 flex-nowrap items-center"
            >
                <img
                className="aspect-square object-cover rounded-lg w-1/5"
                src={item?.photo ? stables.UPLOAD_FOLDER_BASE_URL + item?.photo : images.NoImage}
                alt={item?.title}
                />
                <div className="text-sm font-roboto text-dark-hard font-medium">
                <h3 className="text-sm font-roboto text-dark-hard font-medium md:text-base lg:text-lg">
                    <Link to={`/blog/${item?.slug}`}>{item.title}</Link>
                </h3>
                <span className="text-xs opacity-60">
                    {new Date(item?.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    })}
                </span>
                </div>
            </div>
            ))}
        </div>
        <h2 className="font-roboto font-medium text-dark-hard mt-8 md:text-xl">
            Tags
        </h2>
        {tags.length === 0 ? (
            <p className="text-slate-500 text-xs mt-2">
            There is not tags for this post
            </p>
        ) : (
            <div className="flex flex-wrap gap-x-2 gap-y-2 mt-4">
            {tags.map((item, index) => (
                <Link
                key={index}
                to="/"
                className="inline-block rounded-md px-3 py-1.5 bg-primary font-roboto text-xs text-white md:text-sm"
                >
                {item}
                </Link>
            ))}
            </div>
        )}
        </div>
    );
};

export default SuggestedPosts;