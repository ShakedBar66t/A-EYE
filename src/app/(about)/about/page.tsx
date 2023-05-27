import Navbar from '@/components/Navbar'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface pageProps {
    session: Session
}

const page: FC<pageProps> = ({ session }) => {
    return (
        <div>
            <Navbar />
            <div className='form-shadow m-[100px]'>
                <div className='bg-[#fff] rounded-[10px] p-[20px] flex justify-center items-center text-center text-3xl flex-col'>
                    <h1>About me</h1>
                    <Image
                        src='/LIVE MEATA - OHANA-1.jpeg'
                        alt='selfie'
                        height={200}
                        width={200}
                        className='rounded-[1000px] pt-[10px]'
                    />
                    <h2 className='text-base pt-[10px]'>My name is Shaked Barsheshet, I'm a FullStack developer.
                        <hr />
                        I'm 24 years old from Haifa ,Israel.
                    </h2>

                    <div className='flex flex-row pt-[10px]'>
                        <Link href='https://www.facebook.com/BarsheshetShaked'>
                            <Image
                                src='/facebook logo.svg'
                                alt='selfie'
                                height={100}
                                width={100}
                                className=''
                            />
                        </Link>
                        <Link href='https://www.instagram.com/shakedbar66t/'>
                            <Image
                                src='/Instagram-Logo.wine.svg'
                                alt='selfie'
                                height={100}
                                width={100}
                                className=''
                            />
                        </Link>
                        <Link href='https://www.linkedin.com/in/shaked-barsheshet-518696223/'>
                            <Image
                                src='/LinkedIn-Icon-Logo.wine.svg'
                                alt='selfie'
                                height={100}
                                width={100}
                                className=''
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page