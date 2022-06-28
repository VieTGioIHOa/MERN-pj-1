import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/outline'

import { AuthContext } from '../contexts/AuthContext'
import { PostContext } from '../contexts/PostContext'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import SinglePost from '../components/posts/SinglePost'
import CreatePostModal from '../components/modals/CreatePostModal'
import ToastMessage from '../components/ToastMessage'
import UpdatePostModal from '../components/modals/UpdatePostModal'

export default function Dashboard() {

    const { postState, getPosts, setShowCreatePostModal } = useContext(PostContext)

    const { authState } = useContext(AuthContext)
    const Navigate = useNavigate()

    //Start: Get all Posts
    useEffect(() => {
        getPosts()
    }, [])

    let body = null
    if (postState.postLoading) {
        body = (
            <>
                <Navbar />
                <Loading />
            </>
        )
    } else if (postState.posts.length === 0) {
        body = <>
            <div>
                <Navbar />
                <div className="container lg:px-32 sm:p-0 px-3 mt-20">
                    <div className="text-center mt-5 rounded-xl border border-solid border-blue-500 pb-5 overflow-hidden">
                        <div className="bg-blue-200 py-2">
                            <h1 className="text-4xl text-slate-700">Hello {authState?.user?.username}</h1>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mt-2 text-red-600">Wellcom to VIETGIOIHOA</h3>
                            <p className="text-slate-600 mb-2 mt-1">Click the button below to track your first skill to learn</p>
                            <button
                                onClick={() => setShowCreatePostModal('flex')}
                                className="bg-blue-400 rounded px-2 py-1 text-white hover:bg-blue-500"
                            >
                                Click me!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    } else {
        body = (
            <div>
                <Navbar />
                <div className="container xl:px-32 sm:p-0 px-3 mt-20 ">
                    <div className="flex flex-wrap mx-[-12px] ">
                        {postState.posts.map((post, id) => (
                            <div key={id} className="lg:w-1/3 sm:w-1/2 w-full px-3 sm:mt-3 mt-6">
                                <SinglePost post={post} />
                            </div>
                        ))}
                        <div className="lg:w-1/3 sm:w-1/2 w-full px-3 sm:mt-3 mt-6 ">
                            <div
                                onClick={() => setShowCreatePostModal('flex')}
                                className="flex items-center justify-center bg-[rgba(0,0,0,0.2)] rounded-lg h-full hover:bg-[rgba(0,0,0,0.3)] cursor-pointer"
                            >
                                <PlusIcon className="w-10 h-10 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        authState.authLoading ? <Loading /> :
            authState.isAuthenticated ?
                <div className="h-screen overflow-auto pb-5">
                    {body}
                    <CreatePostModal />
                    <UpdatePostModal />
                    <ToastMessage delay='3000' />
                </div>
                : Navigate('/login')
    )
}
