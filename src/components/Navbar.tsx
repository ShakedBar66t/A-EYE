import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import SignOutButton from './SignOutButton'

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = ({ }) => {
    return <div className='h-full m-[40px] flex justify-between'>
        <div>
            <Link href='/dashboard'>
                <Image
                    src='/text-1682852144913.png'
                    alt='logo'
                    width={100}
                    height={100}
                />
            </Link>
        </div>

        <SignOutButton />
    </div>
}

export default Navbar