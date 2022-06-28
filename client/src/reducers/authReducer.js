
export const authReducer = (state, action) => {
    const { payload, type } = action
    const { isAuthenticated, user } = payload
    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            }
        default:
            return state
    }
}