import Image from 'next/image'
import { FC } from 'react'

interface FooterProps { }

const Footer: FC<FooterProps> = () => {
    return (
        <footer className="footer fixed left-0 bottom-0 w-full flex items-center justify-center">
            <div className="text-lg flex items-center">
                <span className="mr-4">© Shaked Barsheshet 2023</span>
                <div className="flex flex-row gap-2">
                    <a
                        href="https://www.facebook.com/BarsheshetShaked"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/facebook logo.svg"
                            alt="selfie"
                            height={40}
                            width={40}
                        />
                    </a>
                    <a
                        href="https://www.instagram.com/shakedbar66t/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/Instagram-Logo.wine.svg"
                            alt="instagram"
                            height={40}
                            width={40}
                        />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/shaked-barsheshet-518696223/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/LinkedIn-Icon-Logo.wine.svg"
                            alt="linkedin"
                            height={40}
                            width={40}
                        />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
