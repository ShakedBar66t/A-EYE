"use client"
import Navbar from '@/components/Navbar'
import { options } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'

interface pageProps {

}

const page: React.FC<pageProps> = ({ }) => {

  const [formData, setFormData] = useState({
    email: '',
    fullName: ''
  })

  const router = useRouter()

  const onSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch('/api/auth/updateuser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession()
      if (session) {
        setFormData({
          email: session?.user?.email || '',
          fullName: session?.user?.fullName || '',
        })
      } else {
        console.log('no session')
      }
    }
    fetchData()
  }, [])


  return (
    <div>
      <Navbar />
      <div className='form-shadow m-[100px]'>
        <form onSubmit={onSaveUser} className='bg-[#fff] rounded-[10px] flex flex-col p-[20px] items-center'>
          <div>
            <label htmlFor="email" className='p-[10px]'>Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              placeholder='Email'
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="placeholder-gray-400 text-gray-400 focus:text-black border-b-2 outline-0"
            />
          </div>
          <div>
            <label htmlFor="fullName" className='p-[10px]'>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="placeholder-gray-400 text-gray-400 focus:text-black border-b-2 outline-0 pt-[10px]"
              placeholder="Full Name"
            />
          </div>
          <button className='hover:opacity-80 py-2 px-6 bg-lime-600 rounded-3xl text-xs uppercase text-white mt-[20px]' type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default page