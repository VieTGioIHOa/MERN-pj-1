import React from 'react'
import { RefreshIcon } from '@heroicons/react/outline'

export default function Loading() {
    return (
        <div
            className="fixed text-white text-xl top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)]"
        >
            <RefreshIcon className="h-5 w-5 animate-spin mr-1" />
            Loading...
        </div>
    )
}
