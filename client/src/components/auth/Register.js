import React, { useState, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginIcon, UserIcon } from '@heroicons/react/outline'

import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../AlertMessage'

export default function Register() {

    const { registerUser } = useContext(AuthContext)


    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [alertMessage, setAlertMessage] = useState({ type: '', message: '' })

    const { username, password, confirmPassword } = registerForm

    //router
    const navigate = useNavigate()

    const userNameInputRef = useRef()

    const handleChangeInputForm = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }

    const handleSubmitRegister = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setAlertMessage({
                type: 'error',
                message: "Dont't match password!"
            })
            setTimeout(() => setAlertMessage({ type: '', message: '' }), 3000)
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if (registerData.success) {
                navigate('/dashboard')
            } else {
                setAlertMessage({
                    type: 'error',
                    message: registerData.message
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
        setRegisterForm({
            username: '',
            password: '',
            confirmPassword: '',
        })
        userNameInputRef.current.focus()
    }

    return (
        <div>
            {alertMessage.type ? <AlertMessage message={alertMessage?.message} /> : ''}
            <form className="mx-auto px-3 w-full sm:px-0 sm:w-96" onSubmit={handleSubmitRegister}>
                <div className="mb-3">
                    <label className="text-lg text-black text-left block">Username</label>
                    <input
                        ref={userNameInputRef}
                        placeholder="Enter your username..."
                        type="text"
                        className="form-input w-full mt-1 rounded border border-solid border-slate-300 py-1 px-4 outline-1 outline-solid outline-blue-400"
                        name="username"
                        required
                        value={username}
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
                <div className="mb-3 ">
                    <label className="text-lg text-black text-left block">Confirm Password</label>
                    <input
                        placeholder="Confirm your password..."
                        type="password"
                        className="form-input mt-1 w-full  rounded border border-solid border-slate-300 py-1 px-4 outline-1 outline-solid outline-blue-400"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={handleChangeInputForm}
                    />
                </div>
                <button type="submit" className="bg-blue-400 px-4 py-1 rounded text-white hover:bg-blue-800 flex items-center mx-auto">
                    <UserIcon className="h-4 w-4 mr-1 text-white" />
                    Register
                </button>
            </form>
            <p className="mt-4">Do you have an account?
                <Link className="bg-blue-400 px-4 py-1 ml-2 rounded text-white inline-flex items-center hover:bg-blue-800" to="/login">
                    <LoginIcon className="h-5 w-5 mr-1 text-white" />
                    Login
                </Link>
            </p>
        </div>
    )
}
