import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { LogoutIcon, DotsVerticalIcon } from '@heroicons/react/outline'

import { AuthContext } from '../../contexts/AuthContext'


export default function Navbar() {

    const { authState, logoutUser } = useContext(AuthContext)

    const [showOptions, setShowOptions] = useState(false)


    const handleLogout = () => logoutUser()

    return (
        <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-blue-400 text-white">
            <h1 className="text-2xl">Logo</h1>
            <div className="flex items-center">
                <h2 className="text-xl">{authState.user.username}</h2>
                <button
                    onClick={handleLogout}
                    className="sm:flex hidden ml-6 px-3 py-1 bg-red-500 hover:bg-red-700 rounded items-center"
                >
                    <LogoutIcon className="text-white w-4 h-4 mr-1" />
                    Logout
                </button>
                <button
                    className="block relative sm:hidden bg-[rgba(0,0,0,0.2)] p-[6px] rounded-full ml-3"
                    onClick={() => setShowOptions(!showOptions)}
                >
                    <DotsVerticalIcon className="text-white w-4 h-4" />
                    <div className={`${showOptions ? 'block' : 'hidden'} absolute right-0 bg-white p-2 rounded shadow-md bottom-[-52px]`}>
                        <button
                            onClick={handleLogout}
                            className="flex px-3 py-1 bg-red-500 hover:bg-red-700 rounded items-center"
                        >
                            <LogoutIcon className="text-white w-4 h-4 mr-1" />
                            Logout
                        </button>
                    </div>
                </button>
            </div>
        </div>
    )
}
