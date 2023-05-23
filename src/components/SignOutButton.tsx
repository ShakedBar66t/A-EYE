"use client"

import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, ButtonHTMLAttributes, useState } from 'react'
import { toast } from 'react-hot-toast'

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
    const [isSigninOut, setIsSigninOut] = useState<boolean>(false)
    const router = useRouter()


    const handleSignOut = async () => {
        setIsSigninOut(true)
        try {
            await signOut()
            router.push('/login') // redirect to login page
        } catch (error) {
            toast.error('There was a problem signing out')
        } finally {
            setIsSigninOut(false)
        }
    }
    return (
        <h1 onClick={handleSignOut}>Sign Out</h1>
    )
}

export default SignOutButton