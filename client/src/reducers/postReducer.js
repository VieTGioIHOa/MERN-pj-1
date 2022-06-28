import {
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    CREATE_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST
} from '../contexts/containts'

export default function postReducer(state, action) {
    const { type, payload } = action

    switch (type) {
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: [...payload],
                postLoading: false,
            }
        case GET_POSTS_ERROR:
            return {
                ...state,
                posts: [],
                postLoading: false,
            }
        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, payload],
                postLoading: false,
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload._id),
                postLoading: false,
            }
        case FIND_POST:
            return {
                ...state,
                post: payload,
            }
        case UPDATE_POST:
            return {
                ...state,
                posts: [...state.posts.filter(post => post._id !== payload._id), payload],
                postLoading: false,
            }

        default:
            return state
    }
}
