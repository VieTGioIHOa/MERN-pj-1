import React from 'react'
import { useState, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../AlertMessage'
import { LoginIcon, UserIcon } from '@heroicons/react/outline'

export default function Login() {
    //Context
    const { loginUser } = useContext(AuthContext)

    //state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })
    const [alertMessage, setAlertMessage] = useState({ type: '', message: '' })

    const { username, password } = loginForm

    //router
    const navigate = useNavigate()

    const userNameInputRef = useRef()

    const handleChangeInputForm = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                navigate('/dashboard')
            } else {
                setAlertMessage({
                    type: 'error',
                    message: loginData.message
                })

                setTimeout(() => {
                    setAlertMessage({
                        type: '',
                        message: ''
                    })
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
        setLoginForm({
            username: '',
            password: '',
        })
        userNameInputRef.current.focus()
    }

    return (
        <div className="">
            {alertMessage.type ? <AlertMessage message={alertMessage?.message} /> : ''}
            <form
                className="mx-auto px-3 w-full sm:px-0 sm:w-96 text-center"
                onSubmit={handleSubmitLogin}
            >
                <div className="mb-3">
                    <label className="text-lg text-black text-left block">Username</label>
                    <input
                        ref={userNameInputRef}
                        placeholder="Enter your username..."
                        type="text"
                        className="form-input w-full mt-1 rounded border border-solid border-slate-300 py-1 px-4 outline-1 outline-solid outline-blue-400"
                        name="username"
                        value={username}
                        required
                        onChange={handleChangeInputForm}
                    />
                </div>
                <div className="mb-3 ">
                    <label className="text-lg text-black text-left block">Password</label>
                    <input
                        placeholder="Enter your password..."
                        type="password"
                        className="form-input mt-1 w-full  rounded border border-solid border-slate-300 py-1 px-4 outline-1 outline-solid outline-blue-400"
                        name="password"
                        required
                        value={password}
                        onChange={handleChangeInputForm}
                    />
                </div>
                <button type="submit" className="bg-blue-400 px-4 py-1 rounded text-white hover:bg-blue-800 flex items-center mx-auto">
                    <LoginIcon className="h-5 w-5 mr-1 text-white" />
                    Login
                </button>
            </form>
            <p className="mt-4">Don't have an account?
                <Link className="bg-blue-400 px-4 py-1 ml-2 rounded text-white inline-flex items-center hover:bg-blue-800" to="/register">
                    <UserIcon className="h-4 w-4 mr-1 text-white" />
                    Register
                </Link>
            </p>
        </div>
    )
}
