import axios from 'axios'
import { createContext, useReducer, useState } from 'react'

import postReducer from '../reducers/postReducer'
import { apiUrl, GET_POSTS_SUCCESS, GET_POSTS_ERROR, CREATE_POST, DELETE_POST, UPDATE_POST, FIND_POST } from './containts'

export const PostContext = createContext()

const PostContextprovider = ({ children }) => {
    //State
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postLoading: true
    })

    //State Show/Hide Modals
    const [showCreatePostModal, setShowCreatePostModal] = useState('hidden')
    const [showUpdatePostModal, setShowUpdatePostModal] = useState({ display: 'hidden', id: '' })

    const [showToastMessage, setShowToastMessage] = useState({ type: '', message: '' })

    //get all posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if (response.data.success) {
                dispatch({
                    type: GET_POSTS_SUCCESS,
                    payload: response.data.posts
                })
            }
        } catch (error) {
            dispatch({
                type: GET_POSTS_ERROR,
            })
        }
    }

    //Create post
    const createPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)
            if (response.data.success) {
                dispatch({
                    type: CREATE_POST,
                    payload: response.data.post
                })
            }
            return response.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //delete post
    const deletePost = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${id}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_POST,
                    payload: response.data.post
                })
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    //Find post when user is update post
    const findPost = (postId) => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch({
            type: FIND_POST,
            payload: post
        })
    }

    //update post
    const updatePost = async (id, updateForm) => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${id}`, updateForm)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post
                })
            }
            return response.data
        } catch (error) {

        }
    }

    //Posts context data
    const postContextData = {
        postState,
        getPosts,
        showCreatePostModal,
        setShowCreatePostModal,
        createPost,
        showToastMessage,
        setShowToastMessage,
        deletePost,
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        findPost
    }

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextprovider