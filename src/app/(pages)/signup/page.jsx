"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const page = () => {

    const router = useRouter();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignup = async () => {
        toast.loading("Processing", { id: "1" })
        if (!username || !email || !password) {
            return console.log("All fields required!")
        } else {
            await axios.post("/api/users/signup", {
                username,
                email,
                password
            }).then((res) => {
                toast.success(res.data.message, { id: "1" })
                router.push("/login")
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
            <h1>Signup</h1>
            <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>
            <Link href="/login">Login</Link>
        </div>
    )
}

export default page