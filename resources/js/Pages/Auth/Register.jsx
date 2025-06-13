import React, { useEffect, useState, useCallback } from "react"
import { Link, useForm } from "@inertiajs/react"
import logo from "../../../../public/Assets/logo.png"

export default function Register() {

    // State to manage validation errors
    const [errors, setErrors] = useState({})

    // Inertia's useForm hook to manage form state and submission
    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    // Debounced validation function
    const validateAllFields = useCallback(() => {
        const newErrors = {}
        let isValid = true

        // Name validation
        if (!data.name.trim()) {
            newErrors.name = 'Name is required'
            isValid = false
        } else if (/^\d+$/.test(data.name)) { // Added validation: checks if name contains only numbers
            newErrors.name = 'Name cannot be only numbers'
            isValid = false
        }

        // Email validation
        if (!data.email.trim()) {
            newErrors.email = 'Email is required'
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = 'Email is invalid'
            isValid = false
        }

        // Password validation
        if (!data.password.trim()) {
            newErrors.password = 'Password is required'
            isValid = false
        } else if (data.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
            isValid = false
        }

        // Password confirmation validation
        if (!data.password_confirmation.trim()) {
            newErrors.password_confirmation = 'Confirm your password'
            isValid = false
        } else if (data.password_confirmation !== data.password) {
            newErrors.password_confirmation = 'Passwords do not match'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }, [data.name, data.email, data.password, data.password_confirmation])

    // Enhanced validation with debouncing
    useEffect(() => {
        // Only validate if at least one field has content
        if (
            data.name !== '' ||
            data.email !== '' ||
            data.password !== '' ||
            data.password_confirmation !== ''
        ) {
            const timer = setTimeout(() => {
                validateAllFields()
            }, 300) // 300ms debounce

            return () => clearTimeout(timer)
        }
    }, [data, validateAllFields])

    // Validate a single field on change
    const validateField = (field, value) => {
        let error = ''
        switch (field) {
            case 'name':
                if (!value.trim()) error = 'Name is required'
                else if (/^\d+$/.test(value)) error = 'Name cannot be only numbers' // Added validation for single field
                break
            case 'email':
                if (!value.trim()) error = 'Email is required'
                else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid'
                break
            case 'password':
                if (!value.trim()) error = 'Password is required'
                else if (value.length < 6) error = 'Password must be at least 6 characters'
                break
            case 'password_confirmation':
                if (!value.trim()) error = 'Confirm your password'
                else if (value !== data.password) error = 'Passwords do not match'
                break
            default:
                break
        }
        setErrors(prev => ({ ...prev, [field]: error }))
    }

    // Handle input changes with immediate field validation
    const handleChange = (e) => {
        const { name, value } = e.target
        setData(name, value)

        // Immediate validation for current field
        setTimeout(() => {
            validateField(name, value)
        }, 100)
    }

    // Handle form submission
    const submit = (e) => {
        e.preventDefault()

        // Final validation before submission
        if (validateAllFields()) {
            post("/register", {
                onSuccess: () => {
                    console.log("Registration successful")
                    // Clear form on success
                    setData({
                        name: '',
                        email: '',
                        password: '',
                        password_confirmation: '',
                    })
                    setErrors({})
                },
                onError: (serverErrors) => {
                    console.log("Registration failed", serverErrors)
                    // Handle server-side validation errors
                    setErrors(prev => ({ ...prev, ...serverErrors }))
                }
            })
        }
    }

    return (
        <>
            <div className="border flex flex-col justify-center items-center h-screen">
                <img
                    src={logo}
                    alt="Re:Book"
                    className="w-[15%] m-4"
                />

                {/* Registration Form */}
                <form
                    onSubmit={submit}
                    noValidate
                    className="bg-white shadow-xl flex flex-col w-[25%] p-6 pt-8 pb-8 rounded-xl space-y-4 mb-40"
                >
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your full name"
                        />
                        {errors.name && (
                            <div className="text-sm text-red-500 mt-1">{errors.name}</div>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your email address"
                        />
                        {errors.email && (
                            <div className="text-sm text-red-500 mt-1">{errors.email}</div>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your password (min. 6 characters)"
                        />
                        {errors.password && (
                            <div className="text-sm text-red-500 mt-1">{errors.password}</div>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={handleChange}
                            className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.password_confirmation ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Confirm your password"
                        />
                        {errors.password_confirmation && (
                            <div className="text-sm text-red-500 mt-1">{errors.password_confirmation}</div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`shadow-md w-full py-2 rounded-md transition duration-300 font-medium ${
                            processing
                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                : 'bg-red-800 text-white hover:bg-red-700'
                        }`}
                        disabled={processing}
                    >
                        {processing ? 'Creating Account...' : 'Create Account'}
                    </button>

                    {/* Back to Login Link */}
                    <Link
                        href="/login"
                        className="shadow-md border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-md p-2 block text-center text-blue-500 font-bold transition duration-300"
                    >
                        Back to Login
                    </Link>
                </form>
            </div>
        </>
    )
}
