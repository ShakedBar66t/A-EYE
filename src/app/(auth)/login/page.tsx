"use client"

import Email from 'next-auth/providers/email'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react'
import { loginUser } from '../../../helpers'
import { AxiosError } from 'axios'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [submitError, setSubmitError] = useState("")
    const router = useRouter()

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            setLoading(true)

            const loginRes = await loginUser({ email, password })

            if (loginRes && !loginRes.ok) {
                setSubmitError(loginRes.error || "")
            }
            else {
                router.push("/dashboard")
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMsg = error.response?.data?.error
                setSubmitError(errorMsg)
            }
        }

        setLoading(false)
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
        <div className='border border-black p-[20px]'>
            <h2 className='mb-[20px] '>Login</h2>
            <form onSubmit={handleLogin}>
                <div className='inputBox'>
                    <input
                        type="text"
                        required={true}
                        autoComplete='off'
                        onChange={handleEmailChange} />
                    <span>Email</span>
                </div>
                <div className='inputBox mt-[12px]'>
                    <input
                        type="password"
                        required={true}
                        autoComplete='off'
                        onChange={handlePasswordChange} />
                    <span>Password</span>
                </div>
                <div className='text-sm mt-[10px]'>
                    Dont have an account?
                    <Link href='/signup' className='pl-[5px] text-blue-700 underline'>Sign up
                    </Link>
                </div>

                <button
                    type='submit'
                    className='bg-blue-400 border border-black rounded-lg w-full mt-2 py-[6px] hover:bg-blue-300'>
                    Login
                </button>

                {
                    submitError &&
                    <div className='text-md text-red-500 pt-[10px]' >
                        {submitError}
                    </div >
                }
            </form>
        </div>
    </div>
}

export default page