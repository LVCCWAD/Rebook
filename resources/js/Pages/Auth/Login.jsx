import  React, { useEffect, useState } from "react";
import { Link, useForm, } from "@inertiajs/react";
import logo from "../../../../public/Assets/logo.png";

export default function Login(){
    // validate component
    useEffect(() => {console.log("Rendering: Login.jsx");}, []);

    // Using useForm hook to handle form state
    const { data, setData, post, processing } = useForm({
        // data
        email: 'test@example.com',
        password: '12345678',
    })

    // Local state to track validation errors
    const [errors, setErrors] = useState({});

    // Validate form input fields
    const validate = () => {
        // Logging input data to the console for debugging
        console.log('Validating input data');
        console.log('email: ', data.email);
        console.log('password: ', data.password);


        const newErrors = {}; // Object to hold validation errors

        // Validate email field
        if (!data.email.trim()) {
            newErrors.email = 'Email is required'; // If email is empty
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = 'Email is invalid'; // If email format is wrong
        }

        // Validate password field
        if (!data.password.trim()) {
            newErrors.password = 'Password is required'; // If password is empty
        } else if (data.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'; // If password is too short
        }

        // Set validation errors in state
        setErrors(newErrors);

        // Return true if no errors, otherwise false
        return Object.keys(newErrors).length === 0;
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data using Inertia's setData
        setData(name, value);

        // Clear error message for the current input field
        setErrors({ ...errors, [name]: '' });
    };


    // Handle form submission
    const submit = (e) => {
        e.preventDefault(); // Prevent the browser from reloading the page

        console.log("Form submitted");
        console.log("Route: /login/post");
        console.log("Data: ", data);

        // Run validation before submitting
        if (validate()) {
            console.log('Form data validation success');

            // If valid, send POST request using Inertia's post()
            post("/login/post", {
                onSuccess: () => {
                    console.log("Submission success, redirected"); // Success callback
                },
                onError: (errors) => {
                    console.log("Backend Errors: ", errors); // Show errors from server
                    console.log("Submission failed"); // Handle backend validation errors
                    setErrors(errors); // Optionally, set them in your error state
                }
            });
        } else {
            // Log failure and prevent form submission
            console.log('Abort submission: Form data validation failed');
        }
    }

    return(
        <>
            {/* Page container with centered content */}
            <div className="border flex flex-col justify-center items-center h-[100vh]">

                {/* Logo image at the top of the form */}
                <img
                    src={logo}                            // Source of logo image
                    alt="Re:Book"                         // Alt text for accessibility
                    className="w-[15%] m-4"              // Styling: responsive width and margin
                />

                {/* Main form container */}
                <form
                    onSubmit={submit}
                    noValidate                    // Handle form submit with your custom `submit` function
                    className="flex flex-col w-[25%] p-6 pt-8 pb-8 border rounded-xl space-y-4 mb-40"
                >

                    {/* --- EMAIL FIELD --- */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address                 {/* Label for accessibility */}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}           // Controlled input using Inertia's useForm
                            onChange={handleChange}      // Handle input changes
                            className="mt-1 w-full px-4 py-2 border border-red-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {/* Conditional error display */}
                        {errors.email && (
                            <div className="text-sm text-red-500">{errors.email}</div>
                        )}
                    </div>

                    {/* --- PASSWORD FIELD --- */}
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
                            className="mt-1 w-full px-4 py-2 border border-red-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <div className="text-sm text-red-500">{errors.password}</div>
                        )}
                    </div>

                    {/* --- SUBMIT BUTTON --- */}
                    <button
                        type="submit"
                        className="w-full bg-red-800 text-white py-2 rounded-md hover:bg-red-400 transition duration-300"
                        disabled={processing}            // Disable when submitting
                    >
                        Log In                           {/* Button label */}
                    </button>

                    {/* --- GO TO REGISTER LINK --- */}
                    <Link
                        href="/register"
                        className="border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-md p-2 block text-center text-blue-500 font-bold"
                    >
                        Register here                     {/* Navigation link */}
                    </Link>

                    {/* --- FORGOT PASSWORD LINK --- */}
                    <Link className="block font-bold text-center PT-4">Forgot Password?</Link>
                </form>
            </div>
        </>
    )
}
