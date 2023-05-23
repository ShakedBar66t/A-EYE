"use client"

import Image from 'next/image'
import { FC, useState } from 'react'
import SignOutButton from './SignOutButton'
import { Session, getServerSession } from 'next-auth'
import { options } from '@/pages/api/auth/[...nextauth]'

interface DropDownProps {
    session: Session

}

const DropDown = ({ session, selections }: { selections: any[], session: Session }) => {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div onClick={() => setIsExpanded(!isExpanded)} className='relative' >
            <button className="flex flex-row">
                <Image src="/user.png" alt="user" width={30} height={30} />
                <Image src="/burger.png" alt="user" width={30} height={30} />
            </button>
            {isExpanded && (
                <div className="absolute right-0 bg-white border rounded p-default h-content w-[200px] mt-3">
                    <div className='border-b-2 border-black text-sm p-default hover:cursor-default'>
                        {session?.user?.fullName}
                    </div>
                    <ul>
                        {selections.map((selection, index) => (
                            <li
                                key={selection}
                                className={`hover:bg-blue-400 hover:cursor-pointer hover:text-white p-default text-sm rounded-xl
                                 ${index === selections.length - 1 ? "hover:bg-red-400" : ""} `}
                            >
                                {selection}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    )
}

export default DropDown