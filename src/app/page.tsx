import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { options } from '@/pages/api/auth/[...nextauth]'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {

  const session = await getServerSession(options)

  if (!session) notFound()
  return (
    <div>
      {/* <pre>{JSON.stringify(session)}</pre> */}
    </div>
  )
}
