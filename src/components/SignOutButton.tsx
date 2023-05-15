"use client"

import { signOut } from 'next-auth/react'
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
        <button className='px-[4px] bg-red-500 text-white rounded-lg ml-auto text-sm' onClick={handleSignOut} disabled={isSigninOut}>
            {isSigninOut ? 'Signing out...' : 'Sign out'}
        </button>
    )
}

export default SignOutButton