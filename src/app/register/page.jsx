import Image from "next/image";
import { useState } from "react";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    return ( 
        <section className="mt-8 pb-8">
            <h1 className="text-center text-primary text-4xl">
                Register
            </h1>
            <form className="max-w-xs mx-auto" onSubmit={() =>{}}>
                <input type="email" placeholder="email" value={email}
                    onChange={(ev) => setEmail(ev.target.value)} />
                <input type="password" placeholder="password" value={password}
                    onChange={(ev) => setPassword(ev.target.value)}/>
                <button type="submit">Register</button>
                <div className="my-4 text-center text-gray-500">or login whith google</div>
                <button className="flex gap-4 justify-center">
                    <Image src={'/google.png'} width={20} height={20}/>
                    Login with google
                </button>
            </form>
        </section>
     );
}
 
export default RegisterPage;