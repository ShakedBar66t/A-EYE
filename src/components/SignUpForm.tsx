"use client"

import { FC, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Rubik } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { inputErrors } from '@/types/error';
import { loginUser } from '@/helpers';


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


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        if (checked) {
            setData({ ...data, interests: [...data.interests, name] });
            console.log(data)
        } else {
            setData({ ...data, interests: data.interests.filter((interest) => interest !== name) });
        }
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
                <div className='hover:bg-gray-200 flex h-[60px] items-center rounded-full'>
                    <Link className='mx-[20px]' href='/login'>
                        <Image
                            src='/return arrow.svg'
                            alt='logo2'
                            width={20}
                            height={20}
                        />
                    </Link>
                </div>
                <h2 className='mx-[20px]'>Register</h2>
            </div>
            <form onSubmit={handleSubmit}>
                {inputFields.map((inputField, index) => {
                    if (index === currentInput) {
                        if (inputField.type === 'checkboxes') {
                            return (
                                <div className='my-[200px]' key={inputField.name}>
                                    <label>{inputField.placeholder}</label>
                                    {['Hiking', 'Reading', 'Cooking', 'Photography', 'Traveling'].map((interest, index) => (
                                        <div key={interest}>
                                            <input
                                                type="checkbox"
                                                name={interest}
                                                checked={data.interests.includes(interest)}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label>{interest}</label>
                                        </div>
                                    ))}
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
                                                className="mr-4 px-[40px] py-2 bg-blue-500 text-white rounded disabled:opacity-50"
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