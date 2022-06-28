import React from 'react'

export default function AlertMessage({ message }) {
    return (
        <div className="flex justify-center mb-2">
            <p className="bg-red-700 w-96 py-2 text-white rounded">{message}</p>
        </div>
    )
}
