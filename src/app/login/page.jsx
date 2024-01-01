"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [loginInProgress, setLiginInProgress] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLiginInProgress(true);
        
        await signIn('credentials', {email, password});

        setLiginInProgress(false);
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Login
            </h1>
            <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                <input type="email" name="email"
                    placeholder="email" value={email}
                    disabled={loginInProgress}
                    onChange={ev => setEmail(ev.target.value)}
                />
                <input type="password" name="password" placeholder="password" value={password}
                    disabled={loginInProgress}
                    onChange={ev => setPassword(ev.target.value)}
                />
               <button type="submit" disabled={loginInProgress}>Login</button>
               <div className="my-4 text-center text-gray-500">or login whith google</div>
                <button onClick={() => signIn('google')} className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt="google" width={20} height={20}/>
                    Login with google
                </button>
            </form>
        </section>
    )
}

export default LoginPage;