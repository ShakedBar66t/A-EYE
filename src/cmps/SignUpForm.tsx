"use client"
import { useState } from 'react'
import { useRouter } from 'next/router'

interface SignUpFormProps { }
interface FormData {
    fullName: string
    email: string
    password: string
    interests: string
    [key: string]: string
}

const SignUpForm = () => {
    // const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        password: '',
        interests: '',
    })
    const [activeQuestion, setActiveQuestion] = useState('fullName')
    const [validationErrors, setValidationErrors] = useState<string[]>([])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // perform form validation
        const errors: string[] = []
        if (!formData.fullName) {
            errors.push('Full name is required')
        }
        if (!formData.email) {
            errors.push('Email is required')
        }
        if (!formData.password) {
            errors.push('Password is required')
        }
        if (!formData.interests) {
            errors.push('Interests are required')
        }
        setValidationErrors(errors)

        // if form is valid, submit the data
        if (errors.length === 0) {
            // TODO: submit the data to the server
            console.log()
        }
    }

    const handleNextQuestion = () => {
        const questions = Object.keys(formData)
        const currentQuestionIndex = questions.indexOf(activeQuestion)
        if (currentQuestionIndex < questions.length - 1) {
            const nextQuestion = questions[currentQuestionIndex + 1]
            setActiveQuestion(nextQuestion)
        }
    }

    const questionOrder = ['fullName', 'email', 'password', 'interests']

    return (
        <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <img className='mx-auto h-10 w-auto' src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Sign in to your account</h2>
            </div>
        </div>
    )
}

export default SignUpForm
