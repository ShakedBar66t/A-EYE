"use client"

import { FC, useState } from 'react';
import { inputErrors } from '../../types/error';
import { loginUser } from '../../helpers';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface InputField {
    name: string;
    type: string;
    placeholder: string;
    // Add any other relevant information here
}

const SignUpForm: FC = () => {

    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: "",
        interests: [] as Array<string>
    })

    const [currentInput, setCurrentInput] = useState<number>(0);
    const [formData, setFormData] = useState<any>({});
    const [interests, setInterests] = useState<string[]>([]);
    const [validationErrors, setValidationErrors] = useState<inputErrors[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [submitError, setSubmitError] = useState<string>("")
    const router = useRouter()


    const inputFields: InputField[] = [
        { name: 'fullName', type: 'text', placeholder: 'Full name' },
        { name: 'email', type: 'email', placeholder: 'Email' },
        { name: 'password', type: 'password', placeholder: 'Password' },
        { name: 'interests', type: 'checkboxes', placeholder: 'Interests' },
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
        <div>
            <form onSubmit={handleSubmit}>
                {inputFields.map((inputField, index) => {
                    if (index === currentInput) {
                        if (inputField.type === 'checkboxes') {
                            return (
                                <div key={inputField.name}>
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
                                    <button
                                        type="submit"
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                        disabled={validationErrors.length > 0}
                                    >Submit</button>
                                </div>

                            );

                        } else {
                            const inputError = validationErrors.find(
                                (error) => error[inputField.name]
                            );
                            const inputClassName = `border ${inputError ? "border-red-500" : ""
                                } w-full px-3 py-2 rounded mb-4`;
                            return (
                                <div key={inputField.name}>
                                    <input
                                        type={inputField.type}
                                        placeholder={inputField.placeholder}
                                        name={inputField.name}
                                        value={formData[inputField.name]}
                                        onChange={handleInputChange}
                                        required
                                        className={inputClassName}
                                    />
                                    {inputError && (
                                        <p className="text-red-500 text-sm">{inputError[inputField.name]}</p>
                                    )}
                                    <button
                                        type="button"
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                        onClick={handleNextClick}
                                        disabled={validationErrors.length > 0}
                                    >
                                        Next
                                    </button>
                                </div>
                            );
                        }
                    } else {
                        return null;
                    }
                })}
            </form>
        </div>
    );
};

export default SignUpForm;
