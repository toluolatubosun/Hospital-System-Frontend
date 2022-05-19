import { setCookies } from "cookies-next";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import { authLogin } from "../../api";
import { toast } from 'react-toastify';
import Link from "next/link";
import Image from "next/image";
import logo_trans from "../../public/logo.png"

export default function Login() {
    const router = useRouter()

    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    })

    const HandleSubmit = async (e) => {
        e.preventDefault()

        mutate(formData)
    }

    const { mutate } = useMutation(authLogin, {
        onMutate: () => {
            toast.info("Logging In...", {
                autoClose: false
            })
        },
        onSuccess: (response) => {
            toast.dismiss()
            toast.success(response.data.message)

            setCookies("auth-token", response.data.data.token)
            setTimeout(() => {
                window.location = "/app/user"
            }, 1500)
        },
        onError: (error) => {
            toast.dismiss()
            toast.error(error.response.data.message || error.message || "An Error Occurred");
        }
    })

	return (
        <>
        <div className="h-full">
            <div className="flex flex-col items-center justify-center h-full min-h-screen py-16 bg-red-600">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 ">
                        <div className="flex justify-center">
                            <Link href="/" passHref>
                                <div className="w-44 h-44 cursor-pointer">
                                    <Image src={logo_trans} alt="logo" />
                                </div>
                            </Link>
                        </div>

                        <h1 className="text-center text-xl mb-2">Login</h1>

                        <form className="flex flex-col items-center"onSubmit={HandleSubmit}>
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

                            <button className="p-4 w-full mt-4 text-white bg-yellow-500 rounded-lg">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
	)
}
