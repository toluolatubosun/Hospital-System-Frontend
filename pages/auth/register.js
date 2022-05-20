import React from "react";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { authRegister } from "../../api";

import Link from "next/link";
import Image from "next/image";
import logo_trans from "../../public/logo.png"

export default function Login() {
    const router = useRouter()

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const HandleSubmit = async (e) => {
        e.preventDefault()
        mutate(formData)
    }

    const { mutate } = useMutation(authRegister, {
        onMutate: () => {
            toast.info("Registering...", {
                type: "info",
                autoClose: false
            })
        },
        onSuccess: (response) => {
            toast.dismiss()
            toast.success(response.data.message)

            setTimeout(() => {
                router.push("/auth/login")
            }, 1000)
        },
        onError: (error) => {
           toast.error(error.response.data.message || error.message || "An Error Occurred");
        }
    })

	return (
        <>
        <div className="h-full">
            <div className="flex flex-col items-center justify-center h-full min-h-screen py-16 bg-red-600">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 ">
                        <div className="mb-4 flex justify-center">
                            <Link href="/" passHref>
                                <div className="w-44 h-44 cursor-pointer">
                                    <Image src={logo_trans} alt="logo" />
                                </div>
                            </Link>
                        </div>

                        <h1 className="text-center text-2xl">Register</h1>

                        <form className="flex flex-col items-center"onSubmit={HandleSubmit}>
                            <div className="mt-2 w-full">
                                <input 
                                    className="block w-full p-3 border border-gray-300 rounded-lg"
                                    type="text"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ 
                                        ...formData, 
                                        name: e.target.value 
                                    })}
                                />
                            </div>
                            
                            <div className="mt-2 w-full">
                                <input 
                                    className="block w-full p-3 border border-gray-300 rounded-lg"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ 
                                        ...formData, 
                                        email: e.target.value 
                                    })}
                                />
                            </div>
                            
                            <div className="mt-2 w-full">
                                <input
                                    className="block w-full p-3 border border-gray-300 rounded-lg"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        password: e.target.value
                                    })}
                                />
                            </div>

                            <button className="p-4 w-full mt-3 text-white bg-amber-500 rounded-lg">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
	)
}
