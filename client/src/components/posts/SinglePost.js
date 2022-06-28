import React from 'react'

import ActionsPost from './ActionsPost'

export default function SinglePost({ post }) {
    const { title, description, status, url, _id } = post

    return (
        <div
            className={`${status === 'TO LEARN' ? 'border-red-400' : status === 'LEARNED' ? 'border-blue-400' : 'border-yellow-400'} border-solid border-2 p-5 rounded-lg shadow-md`}
        >
            <div className="flex justify-between">
                <h2 className="text-xl font-bold flex-1 line-clamp-1">{title}</h2>
                <ActionsPost url={url} id={_id} />
            </div>
            <button
                className={
                    `${status === 'TO LEARN' ? 'bg-red-400' : status === 'LEARNED' ? 'bg-blue-400' : 'bg-yellow-400'}  
                    text-white py-1 px-2 rounded my-2`
                }
            >
                {status}
            </button>
            <p className="line-clamp-2">{description}</p>
        </div>
    )
}
