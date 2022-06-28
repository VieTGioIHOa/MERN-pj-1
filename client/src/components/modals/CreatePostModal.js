import React, { useContext, useState } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { Listbox } from '@headlessui/react'

import { PostContext } from '../../contexts/PostContext'

export default function CreatePostModal() {
    //Context
    const { showCreatePostModal, setShowCreatePostModal, createPost, setShowToastMessage } = useContext(PostContext)

    //State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })

    const { title, description, url, status } = newPost

    const handleChangePostForm = (e) => {
        setNewPost(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const handleHideCreatePostModal = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
        setShowCreatePostModal('hidden')
    }

    const handleSubmitPostForm = async (e) => {
        e.preventDefault()
        const { success, message } = await createPost(newPost)
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
        setShowToastMessage({ type: success, message: message })

        setShowCreatePostModal('hidden')
    }

    return (
        <div
            className={`${showCreatePostModal} fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)]`}
        >
            <div className="sm:w-96 w-4/5 p-5 rounded bg-white relative">
                <div >
                    <h2 className="text-black text-xl mr-3">What do you want to learn?</h2>
                    <XIcon
                        onClick={handleHideCreatePostModal}
                        className="h-6 w-6 text-black absolute top-3 right-3 cursor-pointer" />
                </div>
                <form onSubmit={handleSubmitPostForm}>
                    <input
                        placeholder="Title..."
                        type="text"
                        className="form-input mt-3 w-full rounded border border-solid border-slate-300 py-1 px-4 outline-1 outline-solid outline-blue-400"
                        name="title"
                        required
                        value={title}
                        onChange={handleChangePostForm}
                    />
                    <p className="text-slate-400 text-sm">Required</p>
                    <textarea
                        placeholder="Description..."
                        type="text"
                        rows='3'
                        className="form-textarea mt-3 w-full rounded border border-solid border-slate-300 py-1 px-4 outline-1 outline-solid outline-blue-400"
                        name="description"
                        value={description}
                        onChange={handleChangePostForm}
                    />
                    <input
                        placeholder="Youtube URL"
                        type="text"
                        className="form-input mt-3 w-full rounded border border-solid border-slate-300 py-1 px-4 outline-1 outline-solid outline-blue-400"
                        name="url"
                        value={url}
                        onChange={handleChangePostForm}
                    />
                    <select
                        value={status}
                        onChange={handleChangePostForm}
                        name="status"
                        className="form-select text-slate-400 outline-solid outline-blue-400 rounded mt-3 border border-solid border-slate-300"
                    >
                        <option className="text-black px-2 py-1 mb-1 hover:bg-red-500" value="TO LEARN">TO LEARN</option>
                        <option className="text-black px-2 py-1 mb-1 hover:bg-yellow-500" value="LEARNING">LEARNING</option>
                        <option className="text-black px-2 py-1 mb-1 hover:bg-blue-500" value="LEARNED">LEARNED</option>
                    </select>
                    <div className="mt-8 text-right">
                        <button
                            type="button"
                            onClick={handleHideCreatePostModal}
                            className="bg-red-400 px-4 py-1 ml-2 rounded text-white inline-flex items-center hover:bg-red-800"
                        >
                            Cancel
                        </button>
                        <button className="bg-blue-400 px-4 py-1 ml-2 rounded text-white inline-flex items-center hover:bg-blue-800" type="submit">OK</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
