"use client"

import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import SignOutButton from './SignOutButton'
import DropDown from './DropDown'
import { Session } from 'next-auth'

interface NavbarProps { }

const Navbar: FC<NavbarProps> = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 576)
        }
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])


    const RenderNavbar = () => {
        if (isMobile) {
            return (
                <div className='h-full m-[10px] flex justify-between items-center relative'>
                    <div className='flex items-center gap-[60px]'>
                        <Link href='/home'>
                            <Image src='/text-1682852144913.png' alt='logo' width={100} height={100} />
                        </Link>
                    </div>
                    <div className='flex flex-row border border-black rounded-xl f-shadow items-center hover:cursor-pointer p-[5px]'>
                        <DropDown
                            selections={[
                                <Link href='/dashboard'>
                                    <div>Account</div>
                                </Link>,
                                <SignOutButton />,
                            ]}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className='h-full m-[10px] flex justify-between items-center relative'>
                    <div className='flex items-center gap-[60px]'>
                        <Link href='/home'>
                            <Image src='/text-1682852144913.png' alt='logo' width={100} height={100} />
                        </Link>
                        <div>
                            <Link href='/home' className='hover:underline font-bold'>Home</Link>
                        </div>
                        <div>
                            <Link href='/dashboard' className='hover:underline font-bold '>Dashboard</Link>
                        </div>
                    </div>
                    <div className="bg-red-400 rounded-3xl p-[5px] text-white hover:bg-red-300 hover:cursor-pointer">
                        <SignOutButton className="w-full h-full text-lg" />
                    </div>

                </div>
            );
        }
    };

    return <RenderNavbar />;
}


export default Navbar
