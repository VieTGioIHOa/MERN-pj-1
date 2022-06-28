import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import { AuthContext } from '../contexts/AuthContext'
import Loading from '../components/Loading'

export default function AuthForm({ authRoute }) {

    const { authState } = useContext(AuthContext)
    const Navigate = useNavigate()

    return (
        authState.authLoading ?
            <Loading /> :
            authState.isAuthenticated === true ?
                Navigate('/dashboard') :
                <div className="container text-center pt-40">
                    <h1 className="mb-5 text-3xl text-bold">VIETGIOIHOA</h1>
                    <>
                        {authRoute === 'login' && <Login />}
                        {authRoute === 'register' && <Register />}
                    </>
                </div>
    )
}
