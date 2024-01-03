'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import {InfoBox} from '../../components/layout/InfoBox'
import toast from "react-hot-toast";
import { UserTabs } from './../../components/layout/tabs';
import { EditableImage } from './../../components/EditableImage';

const ProfilePage = () => {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data?.user?.name);
            fetch('/api/profile').then(res => {
                res.json().then(data => {
                    console.log(data);
                    setUserName(data.name);
                    setImageUrl(data.image);
                    setCity(data.city);
                    setCountry(data.country);
                    setStreetAddress(data.streetAddress);
                    setPhone(data.phone);
                    setPostalCode(data.postalCode);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        }
    },[session,status])

    const handleProfileInfoUpdate = async (ev) => {
        ev.preventDefault();
        const savePromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    name: userName,
                    image: imageUrl,
                    streetAddress,
                    phone,
                    postalCode,
                    country,
                    city
                })
            });
            if (response.ok)
                resolve();
            else
                reject();
        });    
        toast.promise(savePromise, {
            loading: "Profile saving...",
            success: "Profile Seved Successfully!",
            error: "Failed saving Profile."
        })
    }


    if ( status === "loading" || !profileFetched) {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    return ( 
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-md mx-auto">
                <div className='flex gap-4 items-center'>
                    <div className="h-full w-[180px] mb-auto">
                        <div className='bg-gray-100 p-2 rounded-lg mt-1'>
                            <EditableImage link={imageUrl} setLink={setImageUrl} />
                        </div>
                    </div>
                    <form className='grow ' onSubmit={handleProfileInfoUpdate}>
                        <label>FirstName and LastName</label>
                        <input
                            onChange={(ev => setUserName(ev.target.value))}
                            type='text'
                            value={userName}
                            placeholder='First and last name'
                        />
                        <label>Email</label>
                        <input type='email' disabled={true} value={session.data?.user.email} />
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Phone number"
                            onChange={ev => setPhone(ev.target.value)}
                            value={phone}
                        />
                        <label>Address</label>
                        <input
                            type="text" placeholder="Street address"
                            value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                        <div className="flex gap-2 ">
                            <div>
                                <label>postal Code</label>
                                <input
                                    type="text" placeholder="Postal code"
                                    value={postalCode} onChange={ev => setPostalCode(ev.target.value)}
                                    />
                            </div>
                            <div>
                                <label>city</label>
                                <input
                                    type="text" placeholder="city"
                                    value={city} onChange={ev => setCity(ev.target.value)}
                                />
                            </div>
                        </div>
                        <label>Country</label>
                        <input
                            type="text" placeholder="Country"
                            className="m-0"
                            value={country} onChange={ev => setCountry(ev.target.value)}
                        />
                        <button type='submit'>Save</button>
                    </form>
                </div>
            </div>
        </section>
     );
}
 
export default ProfilePage;