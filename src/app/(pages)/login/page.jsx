"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {

    }

    return (
        <div className='signup-container'>
            <h1>Login</h1>
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <Link href="/signup">Signup</Link>
        </div>
    )
}

export default page