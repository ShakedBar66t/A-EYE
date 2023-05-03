"use client"

import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

    const [showLoginForm, setShowLoginForm] = useState(false)

    const handleLoginClick = () => {
        setShowLoginForm(!showLoginForm)
    }

    return <div className='flex items-center justify-center flex-col text-center pt-20'>
        <div className=''>
            <Image
                src='/Eye-03-Europe-Africa.svg'
                alt='logo2'
                width={200}
                height={200}
                className='pb-[5px]'
            />
            <Image
                src='/text-1682852144913.png'
                alt='logo'
                width={200}
                height={200}
            />
        </div>
        <h1 className='py-10 text-2xl w-[70vw]'>Picture-perfect moments, without the hassle</h1>

        {showLoginForm ? (
            <form className='flex flex-col'>
                <input
                    type="email"
                    name="email"
                    placeholder='Enter email'
                    className='border border-gray-400 rounded-lg py-2 px-4 mb-2 w-[50vw]'
                />
                <input
                    type="password"
                    name="password"
                    className='border border-gray-400 rounded-lg py-2 px-4 mb-2'
                />
                <button className='bg-blue-500 text-white py-2 px-4 rounded-lg'>
                    Login
                </button>
                <button
                    className="mt-[10px] text-gray-400 text-[15px] underline"
                    onClick={handleLoginClick}>
                    Go back
                </button>
            </form>
        ) : (

            <div className='flex flex-col'>
                <button
                    className="bg-white border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-500 ease-in-out rounded-lg py-2 px-4 w-[50vw] mb-2"
                    onClick={handleLoginClick}>
                    Login
                </button>
                <div>
                    Dont have an account? 
                    <Link className='ml-[4px] text-blue-700 underline' href='/signup'>
                        Sign up
                    </Link>
                </div>

            </div>
        )}
    </div>
}

export default page