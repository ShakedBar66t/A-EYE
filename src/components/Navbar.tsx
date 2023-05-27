import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import SignOutButton from './SignOutButton'
import DropDown from './DropDown'
import { Session } from 'next-auth'

interface NavbarProps {
}

const Navbar: FC<NavbarProps> = ({  }) => {
    return <div className='h-full m-[10px] flex justify-between relative'>
        <div className='flex items-center'>
            <Link href='/home'>
                <Image
                    src='/text-1682852144913.png'
                    alt='logo'
                    width={100}
                    height={100}
                />
            </Link>
        </div>
        <div className='flex flex-row border border-black rounded-xl f-shadow items-center hover:cursor-pointer px-[5px]'>
            
            <DropDown selections={[
                <Link href='/dashboard'>
                    <div>Account</div>
                </Link>,
                <Link href='/about'>
                    <div>About</div>
                </Link>,
                <SignOutButton/>,
            ]} />
        </div>
    </div>
}

export default Navbar
