"use client"

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC, ButtonHTMLAttributes, useState } from 'react'
import { toast } from 'react-hot-toast'

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
    const [isSigninOut, setIsSigninOut] = useState<boolean>(false)


    const handleSignOut = async () => {
        setIsSigninOut(true)
        try {
            await signOut()
        } catch (error) {
            toast.error('There was a problem signing out')
        } finally {
            setIsSigninOut(false)
        }
    }
    return (
        <button className='bg-red-500' onClick={handleSignOut} disabled={isSigninOut}>
            {isSigninOut ? 'Signing out...' : 'Sign out'}
        </button>
    )
}

export default SignOutButton