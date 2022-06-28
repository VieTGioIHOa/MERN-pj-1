import React, { useContext, useEffect } from 'react'

import { PostContext } from '../../contexts/PostContext'
import { CheckIcon } from '@heroicons/react/outline'

export default function ToastMessage({ delay }) {

    const { showToastMessage, setShowToastMessage } = useContext(PostContext)
    const { type, message } = showToastMessage

    useEffect(() => {
        const idTimeOut = setTimeout(() => {
            setShowToastMessage({ type: '', message: '' })
        }, delay)

        return () => clearTimeout(idTimeOut)
    })
    return (
        <div
            className={`${type ? 'flex' : 'hidden'} items-center  animate-bounce fixed px-4 py-2 text-white rounded top-20 right-3 bg-green-500`}
        >
            <CheckIcon className="mr-2 h-6 w-6" />
            {message}
        </div>
    )
}
