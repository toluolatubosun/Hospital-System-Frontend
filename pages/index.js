import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"

import logo_trans from "../public/logo.png"

export default function Home() {
	const router = useRouter()
	return (
		<div className="bg-red-600 h-full min-h-screen">
			<div className="flex flex-row justify-center">
				<div className="w-52 mt-10">
					<Image src={logo_trans}/>
				</div>
			</div>

			<h1 className="text-amber-500 uppercase font-bold text-center text-3xl mt-10">UNIOSUN Teaching Hospital, Osogbo</h1>

			<div className="flex flex-row justify-center space-x-4 mt-10">
				<button
					onClick={() => router.push(`/auth/login`)}
					className="bg-amber-500 text-white font-medium text-xl py-2 px-4 rounded"
				>
					Login
				</button>

				<button
					onClick={() => router.push(`/auth/register`)}
					className="bg-amber-500 text-white font-medium text-xl py-2 px-4 rounded"
				>
					Register
				</button>

				<button
					onClick={() => router.push(`/app/search`)}
					className="bg-amber-500 text-white font-medium text-xl py-2 px-4 rounded"
				>
					Search
				</button>
			</div>
		</div>  
	)
}
