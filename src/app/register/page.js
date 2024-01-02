'use client';

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [UserCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    const handleFormSubmit = async (ev) => {
        ev.preventDefault();
        setCreatingUser(true);
        setEmail(false);
        setUserCreated(false);
        await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            if (response.ok) {
                setUserCreated(true);

            } else {
                setError(true);
            }
        })
        .finally(() => {
            setCreatingUser(false);
        });
    }

    return ( 
        <section className="mt-8 pb-8">
            <h1 className="text-center text-primary text-4xl">
                Register
            </h1>
            {UserCreated && (
                <div className="text-center text-pretty">
                    User created.<br />
                    Now you can {' '}
                    <Link className="underline" href={'/login'}>Login &raquo;</Link>
                </div>
            )}
            {error && (
              <div className="text-center text-primary">
                An error occured <br />
                Please try again later!    
              </div>
            )}
            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input
                    type="email" placeholder="email"
                    value={email}
                    disabled={creatingUser}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    disabled={creatingUser}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500">or login whith google</div>
                <button type="button" onClick={() => signIn('google')} className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt="google" width={20} height={20}/>
                    Login with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account?{' '}
                    <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
        </section>
     );
}
 
export default RegisterPage;