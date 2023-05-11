import SignUpForm from '@/cmps/SignUpForm'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return <div className='w-screen h-screen'>
    <SignUpForm />
  </div>
}

export default page