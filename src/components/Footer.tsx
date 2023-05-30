import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface FooterProps { }

const Footer: FC<FooterProps> = () => {
    return (
        <footer className="footer fixed left-0 bottom-0 w-full flex items-center justify-center">
            <div className="text-lg flex items-center">
                <span className="mr-4">© Shaked Barsheshet 2023</span>
                <div className="flex flex-row gap-2">
                    <Link href="https://www.facebook.com/BarsheshetShaked">
                        <Image
                            src="/facebook logo.svg"
                            alt="selfie"
                            height={40}
                            width={40}
                        />
                    </Link>
                    <Link href="https://www.instagram.com/shakedbar66t/">
                        <Image
                            src="/Instagram-Logo.wine.svg"
                            alt="instagram"
                            height={40}
                            width={40}
                        />
                    </Link>
                    <Link href="https://www.linkedin.com/in/shaked-barsheshet-518696223/">
                        <Image
                            src="/LinkedIn-Icon-Logo.wine.svg"
                            alt="linkedin"
                            height={40}
                            width={40}
                        />
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
