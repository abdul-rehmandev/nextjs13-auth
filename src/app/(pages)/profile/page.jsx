"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

const page = () => {

    const router = useRouter();

    const handleLogout = async () => {
        toast.loading("Processing", { id: "1" })
        await axios.get("/api/users/logout").then((res) => {
            toast.success(res.data.message, { id: "1" })
            router.push("/login")
        }).catch((err) => {
            toast.error("Something went wrong", { id: "1" })
            console.log(err)
        })
    }

    return (
        <div className='profile-container'>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <h1>Profile</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default page