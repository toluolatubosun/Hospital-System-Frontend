import React from "react";
import { useQuery } from "react-query";
import { userGetMe } from "../../api";

export default function Login() {

    const [user, setUser] = React.useState(null);

    const {isLoading, isError } = useQuery("auth-user", userGetMe, {
        onSuccess: (response) => {
            setUser(response.data.data);
        },
        onError: (error) => {
            setUser(null);
            console.log(error.response.data.message || error.message || "An Error Occurred")
        }
    })

    if (isLoading) return <h1 className="text-center text-4xl mt-20">Loading...</h1>

    if (isError) return <h1 className="text-center text-4xl mt-20">An Error Occurred...</h1>

	return (
        <>
		{ user && (
            <div>
                <h1 className="text-center text-3xl">{user.name}</h1>
                <h1 className="text-center text-3xl">{user.email}</h1>
            </div>
        )}
        </>
	)
}
