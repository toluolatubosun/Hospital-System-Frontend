import React from "react";

import Link from "next/link";
import Image from "next/image";
import logo_trans from "../../public/logo.png"

export default function Add() {
    const HandleSubmit = (e) => {
        e.preventDefault()
    }

    const [formData, setFormData] = React.useState({
        hospitalNumber: '',
        occupation: '',
        surname: '',
        religion: '',
        otherNames: '',
        phoneNumber: '',
        dateOfBirth: '',
        dateAdmitted: '',
        age: '',
        dateTransferred: '',
        address: '',
        ward: '',
        sex: '',
        maritalStatus: '',
        dateDischarged: '',
        consultant: '',
        diagnosis: '',
        image: ''
    })

	return (
        <>
        <div className="h-full">
            <div className="flex flex-col items-center justify-center h-full min-h-screen py-16 bg-red-600">
                <div className="w-full max-w-6xl">
                    <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 ">
                        <h1 className="text-center text-2xl mb-2">Add Patient</h1>

                        <div className="flex justify-center">
                            <img
                                referrerPolicy="no-referrer"
                                className="cursor-pointer w-44 h-44 object-cover rounded-full align-middle border-none shadow-lg"
                                src={
                                    ((!formData.image || formData.image == "delete") &&
                                        `https://ui-avatars.com/api/?format=svg&background=ef4444&color=fff&name=${formData?.surname || "A"}`) ||
                                    (typeof formData.image == "string" && formData.image) ||
                                    (formData && URL.createObjectURL(formData.image))
                                }
                            />
                        </div>

                      
                        <div className="flex flex-row w-full items-center justify-center my-4 mt-8 space-x-2">
                            <div>
                                <label
                                    className="rounded text-center bg-amber-400 text-white text-base p-2.5 font-medium"
                                    htmlFor="image"
                                >
                                    Upload Image
                                </label>

                                <input
                                    id="image"
                                    accept="image/png, image/jpeg"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (!(e.target.files)[0]) return;
                                        setFormData({
                                            ...formData,
                                            image: (e.target.files)[0]
                                        });
                                    }}
                                    name="image"
                                    type="file"
                                />
                            </div>

                            <button
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        image: "delete"
                                    })
                                }
                                type="button"
                                className="rounded text-center bg-amber-400 text-white text-base p-2 font-medium"
                            >
                                Delete Image
                            </button>
                        </div>

                        <form className="flex flex-col items-center"onSubmit={HandleSubmit}>
                            <div className="md:flex md:flex-row md:space-x-2 w-full">
                                <div className="mt-2 w-full">
                                    <label>Hospital Number *</label>
                                    <input 
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="text"
                                        placeholder="Hostpital Number"
                                        value={formData.hospitalNumber}
                                        onChange={(e) => setFormData({ 
                                            ...formData, 
                                            hospitalNumber: e.target.value 
                                        })}
                                        required
                                    />
                                </div>
                                
                                <div className="mt-2 w-full">
                                    <label>Occupation *</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="text"
                                        placeholder="Occupation"
                                        value={formData.occupation}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            occupation: e.target.value
                                        })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="md:flex md:flex-row md:space-x-2 w-full">
                                <div className="mt-2 w-full">
                                    <label>Surname *</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="text"
                                        placeholder="Surname"
                                        value={formData.surname}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            surname: e.target.value
                                        })}
                                        required
                                    />
                                </div>

                                <div className="mt-2 w-full">
                                    <label>Religion</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="text"
                                        placeholder="Religion"
                                        value={formData.religion}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            religion: e.target.value
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="md:flex md:flex-row md:space-x-2 w-full">
                                <div className="mt-2 w-full">
                                    <label>Other Names *</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="text"
                                        placeholder="Other Names"
                                        value={formData.otherNames}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            otherNames: e.target.value
                                        })}
                                        required
                                    />
                                </div>
                                        
                                <div className="mt-2 w-full">
                                    <label>Phone Number *</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="text"
                                        placeholder="Phone Number"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            phoneNumber: e.target.value
                                        })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="md:flex md:flex-row md:space-x-2 w-full">
                                <div className="mt-2 w-full">
                                    <label>Date Of Birth *</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="date"
                                        placeholder="Date of Birth"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            dateOfBirth: e.target.value
                                        })}
                                        required
                                    />
                                </div>

                                <div className="mt-2 w-full">
                                    <label>Date Admitted *</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="date"
                                        placeholder="Date Admitted"
                                        value={formData.dateAdmitted}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            dateAdmitted: e.target.value
                                        })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="md:flex md:flex-row md:space-x-2 w-full">
                                <div className="mt-2 w-full">
                                    <label>Address *</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="text"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            address: e.target.value
                                        })}
                                        required
                                    />
                                </div>

                                <div className="mt-2 w-full">
                                    <label>Sex *</label>
                                    <select
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                gender: e.target.value
                                            })
                                        }
                                        name="gender"
                                        value={formData.gender}
                                        required
                                    >
                                        <option>Gender</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div className="md:flex md:flex-row md:space-x-2 w-full">
                                <div className="mt-2 w-full">
                                    <label>Marital Status *</label>
                                    <select
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                maritalStatus: e.target.value
                                            })
                                        }
                                        name="gender"
                                        value={formData.maritalStatus}
                                        required
                                    >
                                        <option>Marital Status</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                    </select>
                                </div>

                                <div className="mt-2 w-full">
                                    <label>Date Transferred</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="date"
                                        placeholder="Date Admitted"
                                        value={formData.dateTransferred}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            dateTransferred: e.target.value
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="md:flex md:flex-row md:space-x-2 w-full">
                                <div className="mt-2 w-full">
                                    <label>Age *</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="text"
                                        placeholder="Age"
                                        value={formData.age}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            age: e.target.value
                                        })}
                                        required
                                    />
                                </div>

                                <div className="mt-2 w-full">
                                    <label>Date Discharged</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="date"
                                        placeholder="Date Discharged"
                                        value={formData.dateDischarged}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            dateDischarged: e.target.value
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="md:flex md:flex-row md:space-x-2 w-full">
                                <div className="mt-2 w-full">
                                    <label>Consultant *</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="text"
                                        placeholder="Consultant"
                                        value={formData.consultant}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            consultant: e.target.value
                                        })}
                                        required
                                    />
                                </div>

                                <div className="mt-2 w-full">
                                    <label>Diagnosis *</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="text"
                                        placeholder="Diagnosis"
                                        value={formData.diagnosis}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            diagnosis: e.target.value
                                        })}
                                        required
                                    />
                                </div>
                            </div>

                            <button className="p-4 w-full mt-4 text-white bg-amber-500 rounded-lg">
                                SAVE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
	)
}
