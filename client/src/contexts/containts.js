export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'https://shrouded-spire-06847.herokuapp.com/api'
        : 'https://shrouded-spire-06847.herokuapp.com'

export const LOCAL_STORAGE_TOKEN_NAME = 'mern-stack'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_ERROR = 'GET_POSTS_ERROR'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const FIND_POST = 'FIND_POST'
