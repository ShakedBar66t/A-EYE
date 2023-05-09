import Navbar from '@/cmps/Navbar'
import SignOutButton from '@/cmps/SignOutButton'
import { options } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC, ReactNode } from 'react'


interface pageProps {
  children: ReactNode
}



const page = async ({ children }: pageProps ) => {
  const session = await getServerSession(options)
  if (!session) notFound()


  return (
    <div className='flex flex-col'>
      <Navbar/>
      {session?.user?.fullName}
      <SignOutButton/>
    </div>
  )
}

export default page