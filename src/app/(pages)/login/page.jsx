"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import axios from 'axios';


const page = () => {

    const router = useRouter();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        if (!email || !password) {
            return toast.error("All fields required", { id: "1" })
        } else {
            await axios.post("/api/users/login", {
                email,
                password
            }).then((res) => {
                toast.success(res.data.message, { id: "1" })
                router.push("/profile")
            }).catch((err) => {
                toast.error("Something went wrong", { id: "1" })
                console.log(err)
            })
        }
    }

    return (
        <div className='signup-container'>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <h1>Login</h1>
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <Link href="/signup">Signup</Link>
        </div>
    )
}

export default page