import Navbar from '@/components/Navbar'
import SignOutButton from '@/components/SignOutButton'
import DallE from '@/pages/openai'
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
      <DallE />
    </div>
  )
}

export default page