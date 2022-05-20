import React from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { patientGetById, patientUpdate } from "../../api";
import { toast } from "react-toastify";

export default function Edit(){
    const router = useRouter()
    const id = router.query.patientId

    const [patient, setPatient] = React.useState(null)

    const HandleSubmit = (e) => {
        e.preventDefault()

        console.log(patient.religion)
        
        const data = new FormData()
        for (const key in patient) {
            if (patient[key] != "") {
                data.append(key, patient[key]);
            }
        }

        updatePatient({ id, data })
    }

    const { mutate: updatePatient } = useMutation(patientUpdate, {
        onMutate: () => {
            toast.info("Updating... Please Wait", {
                autoClose: false
            })
        },
        onSuccess: async (response) => {
            toast.dismiss()
            toast.success(response.data.message)
        },
        onError: (error) => {
            toast.dismiss()
            toast.error(error.response.data.message || error.message || "An Error Occurred")
        }
    })

    useQuery(["patient", id], () => patientGetById(id), {
        onSuccess: (response) => {
            setPatient(response.data.data)
        },
        onError: (error) => {
            toast.error(error.response.data.message || error.message || "An Error Occurred")
        },
        enabled: router.isReady
    })

    return(
        <>
        { !patient && <h1 className="text-center text-2xl capitalize">Loading...</h1> }

        { patient && (
            <>
            <div className="h-full">
                <div className="flex flex-col items-center justify-center h-full min-h-screen py-16 bg-red-600">
                    <div className="w-full max-w-6xl">
                        <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 ">
                            <h1 className="text-center text-2xl mb-2">Edit Patient</h1>

                            <div className="flex justify-center">
                                <img
                                    referrerPolicy="no-referrer"
                                    className="cursor-pointer w-44 h-44 object-cover rounded-full align-middle border-none shadow-lg"
                                    src={
                                        ((!patient.image || patient.image == "delete") &&
                                            `https://ui-avatars.com/api/?format=svg&background=ef4444&color=fff&name=${patient?.surname || "A"}`) ||
                                        (typeof patient.image == "string" && `${process.env.BACKEND_BASE_URL}/${patient.image}`) ||
                                        (patient && URL.createObjectURL(patient.image))
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
                                            setPatient({
                                                ...patient,
                                                image: (e.target.files)[0]
                                            });
                                        }}
                                        name="image"
                                        type="file"
                                    />
                                </div>

                                <button
                                    onClick={() =>
                                        setPatient({
                                            ...patient,
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
                                            value={patient.hospitalNumber}
                                            onChange={(e) => setPatient({ 
                                                ...patient, 
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
                                            value={patient.occupation}
                                            onChange={(e) => setPatient({
                                                ...patient,
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
                                            value={patient.surname}
                                            onChange={(e) => setPatient({
                                                ...patient,
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
                                            value={patient.religion}
                                            onChange={(e) => setPatient({
                                                ...patient,
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
                                            value={patient.otherNames}
                                            onChange={(e) => setPatient({
                                                ...patient,
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
                                            value={patient.phoneNumber}
                                            onChange={(e) => setPatient({
                                                ...patient,
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
                                            value={patient.dateOfBirth}
                                            onChange={(e) => setPatient({
                                                ...patient,
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
                                            value={patient.dateAdmitted}
                                            onChange={(e) => setPatient({
                                                ...patient,
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
                                            value={patient.address}
                                            onChange={(e) => setPatient({
                                                ...patient,
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
                                                setPatient({
                                                    ...patient,
                                                    sex: e.target.value
                                                })
                                            }
                                            name="gender"
                                            value={patient.sex}
                                            required
                                        >
                                            <option>Sex</option>
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
                                                setPatient({
                                                    ...patient,
                                                    maritalStatus: e.target.value
                                                })
                                            }
                                            name="gender"
                                            value={patient.maritalStatus}
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
                                            value={patient.dateTransferred}
                                            onChange={(e) => setPatient({
                                                ...patient,
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
                                            value={patient.age}
                                            onChange={(e) => setPatient({
                                                ...patient,
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
                                            value={patient.dateDischarged}
                                            onChange={(e) => setPatient({
                                                ...patient,
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
                                            value={patient.consultant}
                                            onChange={(e) => setPatient({
                                                ...patient,
                                                consultant: e.target.value
                                            })}
                                            required
                                        />
                                    </div>

                                    <div className="mt-2 w-full">
                                        <label>Ward *</label>
                                        <input
                                            className="block w-full p-3 border border-gray-300 rounded-lg"
                                            type="text"
                                            placeholder="Ward"
                                            value={patient.ward}
                                            onChange={(e) => setPatient({
                                                ...patient,
                                                ward: e.target.value
                                            })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mt-2 w-full">
                                    <label>Diagnosis *</label>
                                    <input
                                        className="block w-full p-3 border border-gray-300 rounded-lg"
                                        type="text"
                                        placeholder="Diagnosis"
                                        value={patient.diagnosis}
                                        onChange={(e) => setPatient({
                                            ...patient,
                                            diagnosis: e.target.value
                                        })}
                                        required
                                    />
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
        )}       
        </>
    )
}