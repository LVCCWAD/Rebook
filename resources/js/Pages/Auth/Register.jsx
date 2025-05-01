import  React, { useEffect, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import logo from "../../../../public/Assets/logo.png";



export default function Register(){
    // Validate component
    useEffect(() => {console.log("Rendering: Register.jsx");}, []);

    // useForm hook initializes form state with default values
    const { data, setData, post, processing } = useForm({
        user: 'exampleusername',            // Default username
        email: 'test@example.com',         // Default email
        password: '12345678',              // Default password
        password_confirmation: '',         // Empty confirmation field
    });

    // Local state to track validation errors
    const [errors, setErrors] = useState({});

    // Validate form input fields
    const validate = () => {
        // Logging input data to the console for debugging
        console.log('Validating input data');
        console.log('user: ', data.user);
        console.log('email: ', data.email);
        console.log('password: ', data.password);
        console.log('confirm password: ', data.password_confirmation);

        const newErrors = {}; // Object to hold validation errors

        // Validate user field
        if (!data.user.trim()) {
            newErrors.user = 'Name is required'; // If user is empty
        }

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

        // Validate confirmation password field
        if (!data.password_confirmation.trim()) {
            newErrors.password_confirmation = 'Confirm your password'; // If confirm password is empty
        } else if (data.password !== data.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match'; // If passwords don't match
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
        console.log("Route: /register/post");
        console.log("Data: ", data);

        // Run validation before submitting
        if (validate()) {
            console.log('Form data validation success');

            // If valid, send POST request using Inertia's post()
            post("/register/post", {
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

    // Component View
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

                    {/* --- USER FIELD --- */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="user"
                            id="user"
                            name="user"
                            value={data.user}            // This should match your useForm key
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-red-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {/* NOTE: Key mismatch. This should be `errors.user` (not `errors.name`) */}
                        {errors.user && (
                            <div className="text-sm text-red-500">{errors.user}</div>
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

                    {/* --- CONFIRM PASSWORD FIELD --- */}
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
                            className="mt-1 w-full px-4 py-2 border border-red-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password_confirmation && (
                            <div className="text-sm text-red-500">{errors.password_confirmation}</div>
                        )}
                    </div>

                    {/* --- SUBMIT BUTTON --- */}
                    <button
                        type="submit"
                        className="w-full bg-red-800 text-white py-2 rounded-md hover:bg-red-400 transition duration-300"
                        disabled={processing}            // Disable when submitting
                    >
                        Sign In                           {/* Button label */}
                    </button>

                    {/* --- BACK TO LOGIN LINK --- */}
                    <Link
                        href="/login"
                        className="border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-md p-2 block text-center text-blue-500 font-bold"
                    >
                        Back to login                     {/* Navigation link */}
                    </Link>
                </form>
            </div>

        </>
    )
}
