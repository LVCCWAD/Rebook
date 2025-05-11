import React, { useState } from "react";

export default function Profile(){

    const [formData, setFormData] = useState({
        username: 'jonjonski14',
        name: '',
        email: 'al************@gmail.com',
        phone: '**********85',
        gender: '',
        birthDate: {
          date: '',
          month: '',
          year: ''
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleBirthDateChange = ( field, value ) => {
        setFormData({
            ...formData,
            birthDate: {
                ...formData.birthDate,
                [field]: value
            }
        })
    }

    const handleSubmit =() => {
        console.log('Form data submitted: ', formData)
    }

    return(
        <>
            <div className="border w-[80%] h-auto m-4 flex flex-col">

                <div className="border h-20 m-2">
                    <div className="m-2 flex flex-col justify-center items-start">
                        <p>My Profile</p>
                        <p>Manage and protect your accout</p>
                    </div>
                </div>

                <div className="border h-full m-2 flex ">

                <div className="border w-full mx-auto p-6 bg-white shadow-sm">
                    <div className="space-y-4">
                        <div className="flex items-center">
                        <label className="w-32 text-right text-gray-500 text-sm pr-4">Username</label>
                        <div className="flex-1">
                            <p className="text-gray-700">{formData.username}</p>
                        </div>
                        </div>

                        <div className="flex items-center">
                        <label className="w-32 text-right text-gray-500 text-sm pr-4">Name</label>
                        <div className="flex-1">
                            <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded p-2 text-sm"
                            />
                        </div>
                        </div>

                        <div className="flex items-center">
                        <label className="w-32 text-right text-gray-500 text-sm pr-4">Email</label>
                        <div className="flex-1 flex items-center">
                            <span className="text-gray-700">{formData.email}</span>
                            <button type="button" className="ml-2 text-blue-500 text-sm">Change</button>
                        </div>
                        </div>

                        <div className="flex items-center">
                        <label className="w-32 text-right text-gray-500 text-sm pr-4">Phone Number</label>
                        <div className="flex-1 flex items-center">
                            <span className="text-gray-700">{formData.phone}</span>
                            <button type="button" className="ml-2 text-blue-500 text-sm">Change</button>
                        </div>
                        </div>

                        <div className="flex items-center">
                        <label className="w-32 text-right text-gray-500 text-sm pr-4">Gender</label>
                        <div className="flex-1 flex space-x-4">
                            <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === "Male"}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2 text-sm text-gray-700">Male</span>
                            </label>
                            <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === "Female"}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2 text-sm text-gray-700">Female</span>
                            </label>
                            <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Other"
                                checked={formData.gender === "Other"}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2 text-sm text-gray-700">Other</span>
                            </label>
                        </div>
                        </div>

                        <div className="flex items-center">
                        <label className="w-32 text-right text-gray-500 text-sm pr-4">Date of birth</label>
                        <div className="flex-1 flex space-x-2">
                            <div className="relative w-full">
                            <select
                                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={formData.birthDate.date}
                                onChange={(e) => handleBirthDateChange('date', e.target.value)}
                            >
                                <option value="">Date</option>
                                {/* {[...Array(31)].map((_, i) => (
                                <option key={i+1} value={i+1}>{i+1}</option>
                                ))} */}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                {/* <ChevronDown size={16} /> */}
                            </div>
                            </div>

                            <div className="relative w-full">
                            <select
                                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={formData.birthDate.month}
                                onChange={(e) => handleBirthDateChange('month', e.target.value)}
                            >
                                <option value="">Month</option>
                                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, i) => (
                                <option key={i} value={month}>{month}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                {/* <ChevronDown size={16} /> */}
                            </div>
                            </div>

                            <div className="relative w-full">
                            <select
                                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={formData.birthDate.year}
                                onChange={(e) => handleBirthDateChange('year', e.target.value)}
                            >
                                <option value="">Year</option>
                                {/* {[...Array(100)].map((_, i) => {
                                const year = 2025 - i;
                                return <option key={year} value={year}>{year}</option>;
                                })} */}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                {/* <ChevronDown size={16} /> */}
                            </div>
                            </div>
                        </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                        >
                            Save Changes
                        </button>
                        </div>
                    </div>
                    </div>
                </div>

            </div>
        </>
    )
}
