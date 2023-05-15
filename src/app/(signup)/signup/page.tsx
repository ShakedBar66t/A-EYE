import SignUpForm from '@/components/SignUpForm'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return <div className='w-full h-screen'>
    <SignUpForm />
  </div>
}

export default page