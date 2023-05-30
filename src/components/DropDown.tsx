"use client"

import Image from 'next/image'
import { FC, useState } from 'react'
import SignOutButton from './SignOutButton'
import { Session, getServerSession } from 'next-auth'
import { options } from '@/pages/api/auth/[...nextauth]'

interface DropDownProps {
  selections: JSX.Element[]
}

const DropDown: FC<DropDownProps> = ({ selections }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleDropDownToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='relative'>
      <button onClick={handleDropDownToggle} className="flex flex-row">
        <Image src="/user.png" alt="user" width={30} height={30} />
        <Image src="/burger.png" alt="user" width={30} height={30} />
      </button>
      {isExpanded && (
        <div className="absolute right-0 bg-white border rounded p-default h-content w-[200px] mt-3">
          <ul>
            {selections.map((selection, index) => (
              <li
                key={index}
                className={`hover:bg-blue-400 
                  hover:text-white p-default text-sm rounded-xl mt-[5px]
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
