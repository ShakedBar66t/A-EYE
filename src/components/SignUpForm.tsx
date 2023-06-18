"use client"

import { FC, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Rubik } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { inputErrors } from '@/types/error';
import { loginUser } from '@/helpers';
import { Carousel } from 'antd';


const rubik = Rubik({
    subsets: ['latin'],
    weight: '500'
})

interface InputField {
    name: string;
    type: string;
    placeholder: string;
    // Add any other relevant information here
}


interface SignUpFormProps {

}

const SignUpForm: FC<SignUpFormProps> = ({ }) => {
    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: "",
        interests: [] as Array<string>
    })

    const [currentInput, setCurrentInput] = useState<number>(0);
    const [formData, setFormData] = useState<any>({});
    const [validationErrors, setValidationErrors] = useState<inputErrors[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [submitError, setSubmitError] = useState<string>("")
    const router = useRouter()


    const inputFields: InputField[] = [
        { name: 'fullName', type: 'text', placeholder: 'What is your full name?', },
        { name: 'email', type: 'email', placeholder: 'What is your email?' },
        { name: 'password', type: 'password', placeholder: 'Create a password' },
        { name: 'interests', type: 'checkboxes', placeholder: 'Tell us what you like' },
    ];

    const validateData = (): boolean => {
        const err = []

        if (data.fullName?.length < 4) {
            err.push({ fullName: "Full name must be atleast 4 characters long" })
        }
        else if (data.fullName?.length > 30) {
            err.push({ fullName: "Full name should be less than 30 characters" })
        }
        else if (data.password?.length < 6) {
            err.push({ password: "Password should be atleast 6 characters long" })
        }

        setValidationErrors(err)
        if (err.length > 0) {
            return false
        }
        else {
            return true
        }

    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleCheckboxChange = (interest: string) => {
        setData((prevData) => {
            const isChecked = prevData.interests.includes(interest);
            const updatedInterests = isChecked
                ? prevData.interests.filter((item) => item !== interest)
                : [...prevData.interests, interest];

            console.log(updatedInterests, 'interests')

            return { ...prevData, interests: updatedInterests };
        });
    };


    const handleNextClick = () => {
        setCurrentInput(currentInput + 1);
    };

    const handlePreviousClick = () => {
        setCurrentInput(currentInput - 1)
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const isValid = validateData()

        if (isValid) {
            try {
                setLoading(true)
                const apiRes = await axios.post("http://localhost:3000/api/auth/signup", data)

                if (apiRes?.data?.sucess) {
                    const loginRes = await loginUser({
                        email: data.email,
                        password: data.password
                    })

                    if (loginRes && !loginRes.ok) {
                        setSubmitError(loginRes.error || "")
                    } else {
                        router.push('/')
                    }
                }
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    const errorMsg = error.response?.data?.error
                    setSubmitError(errorMsg)
                }
            }

            setLoading(false)
            // router.push('/dashboard')
        }
    };


    return (
        <div className='flex flex-col px-[24px]'>
            <div className='flex h-[90px] items-center px-[24px]'>
                <Link href='/login'>
                    <div className='hover:bg-gray-200 flex p-[20px] items-center rounded-full'>
                        <Image
                            src='/return arrow.svg'
                            alt='logo2'
                            width={20}
                            height={20}
                        />
                    </div>
                </Link>
                <h2 className='mx-[20px]'>Register</h2>
            </div>
            <form onSubmit={handleSubmit} className='h-full'>
                {inputFields.map((inputField, index) => {
                    if (index === currentInput) {
                        if (inputField.type === 'checkboxes') {
                            return (
                                <div className='my-[20px]' key={inputField.name}>
                                    <label className='mb-[20px]'>{inputField.placeholder}</label>
                                    <div className="grid md:grid-cols-5 grid-cols-3 gap-10 h-full my-10">
                                        {[
                                            'Hiking',
                                            'Reading',
                                            'Cooking',
                                            'Traveling',
                                            'Painting',
                                            'Drawing',
                                            'Sculpting',
                                            'Writing',
                                            'Dancing',
                                            'Music',
                                            'Film-making',
                                            'Acting',
                                            'Fashion',
                                            'Pottery',
                                            'Gardening',
                                            'Knitting',
                                            'Wood working',
                                            'Calligraphy',
                                            'Graphic design',
                                            'Animation',
                                            'Graffiti',
                                            'Ceramics',
                                            'Jewelry making',
                                            'Embroidery',
                                        ].map((interest, index) => (
                                            <div
                                                key={index}
                                                className={`p-[20px] border-black border w-[80px] h-[80px] rounded-[100px] ${data.interests.includes(interest) ? 'bg-green-400' : 'bg-red-500'
                                                    } flex flex-col justify-center items-center focus:bg-red-700 cursor-pointer`}
                                                onClick={() => handleCheckboxChange(interest)}
                                            >
                                                <input
                                                    type="checkbox"
                                                    name={interest}
                                                    defaultChecked={data.interests.includes(interest)}
                                                    className="hidden"
                                                />
                                                <span className="text-sm text-center p-[10px]">{interest}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='flex justify-between mt-4'>
                                        {currentInput > 0 && (
                                            <button
                                                type="button"
                                                className="px-[40px] py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                                onClick={handlePreviousClick}
                                                disabled={validationErrors.length > 0}
                                            >
                                                Previous
                                            </button>
                                        )}
                                        <button
                                            type="submit"
                                            className="px-[40px] py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                            disabled={validationErrors.length > 0}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            );
                        } else {
                            const inputError = validationErrors.find(
                                (error) => error[inputField.name]
                            );
                            return (
                                <div className='px-[44px] ' key={inputField.name}>
                                    <label>{inputField.placeholder}</label>
                                    <input
                                        type={inputField.type}
                                        name={inputField.name}
                                        value={formData[inputField.name]}
                                        onChange={handleInputChange}
                                        required
                                        className='w-full px-3 py-2 focus:border-blue-500 rounded mb-4 under-input focus:outline-0'
                                    />
                                    {inputError && (
                                        <p className="text-red-500 text-sm">{inputError[inputField.name]}</p>
                                    )}
                                    <div className='flex justify-end mt-4'>
                                        {currentInput > 0 && (
                                            <button
                                                type="button"
                                                className="mr-4 px-[30px] py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                                onClick={handlePreviousClick}
                                                disabled={validationErrors.length > 0}
                                            >
                                                Previous
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            className="px-[40px] py-2 bg-blue-500 text-white rounded disabled:opacity-50 ml-auto"
                                            onClick={handleNextClick}
                                            disabled={validationErrors.length > 0}
                                        >
                                            Next

                                        </button>
                                    </div>
                                </div>
                            );
                        }
                    }
                    else {
                        return null;
                    }
                })}
            </form>
        </div>

    );

}

export default SignUpForm