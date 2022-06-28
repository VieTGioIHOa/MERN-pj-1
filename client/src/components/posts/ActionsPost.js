import React, { useContext, useState } from 'react'

import { TrashIcon, PencilIcon, VideoCameraIcon } from '@heroicons/react/outline'
import { PostContext } from '../../contexts/PostContext'

export default function ActionsPost({ url, id }) {

    const {
        deletePost,
        findPost,
        setShowUpdatePostModal,
        setShowToastMessage
    } = useContext(PostContext)

    const [showDialog, setShowDialog] = useState(false)

    const handleDeletePost = async () => {
        const { success, message } = await deletePost(id)
        setShowToastMessage({ type: success, message: message })
        setShowDialog(false)
    }

    const handleShowUpdatePostModal = () => {
        findPost(id)
        setShowUpdatePostModal(prevState => ({
            ...prevState,
            display: 'flex',
            id,
        }))
    }


    return (
        <div className="flex items-center">
            <a className="p-1 rounded-full active:bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)]" href={url} target="_blank" rel="noreferrer">
                <VideoCameraIcon className="h-8 w-8 text-blue-600 " />
            </a>
            <button
                onClick={handleShowUpdatePostModal}
                className="p-1 mx-1 rounded-full active:bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)]"
            >
                <PencilIcon className="h-7 w-7 text-yellow-600 " />
            </button>
            <button
                onClick={() => setShowDialog(state => !state)}
                className="p-1 relative rounded-full active:bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)]"
            >
                <TrashIcon className="h-7 w-7 text-red-600 " />
                <div
                    className={`${showDialog ? 'block' : 'hidden'} absolute top-[-90px] right-[-10px] w-40 bg-white shadow-sm rounded border border-solid border-slate-200 px-5 py-3`}>
                    <p className="">Are you sure?</p>
                    <div className="flex items-center justify-center mt-2">
                        <div
                            className="px-2 py-1 bg-red-400 text-white text-sm rounded"
                        >
                            No
                        </div>
                        <button
                            onClick={handleDeletePost}
                            type="button"
                            className="px-2 py-1 ml-2 bg-blue-400 text-white text-sm rounded"
                        >
                            Sure
                        </button>
                    </div>
                </div>
            </button>
        </div>
    )
}
