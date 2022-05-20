import React from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { useMutation, useQuery, useQueryClient } from "react-query"

import { patientDelete, patientSearch } from "../../api"

export default function Search() {
    const router = useRouter()
    const queryClient = useQueryClient()
    
    const [data, setData] = React.useState(null)
    
    const [searchText, setSearchText] = React.useState("")
    const [search, setSearch] = React.useState(true)

    const HandleSubmit = (e) => {
        e.preventDefault()

        toast.info("Loading... Please Wait", {
            autoClose: false
        })
        setSearch(true)
    }

    const { mutate: deletePatient } = useMutation(patientDelete, {
        onMutate: () => {
            toast.info("Deleting... Please Wait", {
                autoClose: false
            })
        },
        onSuccess: async (response) => {
            toast.dismiss()
            toast.success(response.data.message)

            await queryClient.refetchQueries(["search", searchText])
        },
        onError: (error) => {
            toast.dismiss()
            toast.error(error.response.data.message || error.message || "An Error Occurred")
        }
    })

    useQuery(["search", searchText], () => patientSearch(searchText), {
        onSuccess: (response) => {
            toast.dismiss()
            toast.success("Operation Successful")

            setData(response.data.data)
            setSearch(false)
        },
        onError: (error) => {
            toast.dismiss()
            toast.error(error.response.data.message || error.message || "An Error Occurred")

            setSearch(false)
        },
        enabled: search
    })

    return(
        <>
        <div className="flex flex-row justify-center my-8">
            <form className="flex items-center w-full max-w-2xl" onSubmit={HandleSubmit}>   
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input 
                        value={searchText}
                        type="text" id="simple-search" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5" 
                        placeholder="Search" required 
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-amber-500 rounded border border-amber-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
            </form>
        </div>

        { (!data || data.length === 0) && (
            <h1 className="text-center text-2xl capitalize">No Result Found</h1>
        )}

        { data && data.length > 0 && (
            <>
                <h1 className="text-center text-2xl capitalize mb-3">Patients Found: {data.length}</h1>

                <div className="px-10">
                    {data.map((patient) => (
                        <div key={patient._id} className="bg-red-600 border-4 border-amber-500 space-y-2 mb-10 p-6">
                            <p className="text-medium text-white font-semibold"># {patient.hospitalNumber}</p>
                            <h1 className="text-3xl text-white capitalize">{patient.surname}, {patient.otherNames}</h1>
                            <p className="font-medium text-white">Age: {patient.age}</p>
                            <p className="font-medium text-white">Phone Number: {patient.phoneNumber}</p>

                            <div className="flex flex-row space-x-6">
                                <button
                                    onClick={() => router.push(`/app/edit?patientId=${patient._id}`)}
                                    className="bg-amber-500 text-white font-medium text-medium py-2 px-4 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deletePatient(patient._id)}
                                    className="bg-amber-500 text-white font-medium text-medium py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}
        </>
    )
}