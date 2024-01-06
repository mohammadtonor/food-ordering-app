'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import {InfoBox} from '../../components/layout/InfoBox'
import toast from "react-hot-toast";
import { UserTabs } from './../../components/layout/tabs';
import { UserForm } from './../../components/layout/user-form';
const ProfilePage = () => {
    const session = useSession();
    const [userInfo, setUserInfo] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserInfo(prev => {
                return {
                    ...prev,
                    name: session.data?.user?.name,
                    email: session.data?.user?.email
                }
            });
            fetch('/api/profile').then(res => {
                res.json().then(data => {
                    setUserInfo(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        }
    },[session,status])

    const handleProfileInfoUpdate = async (ev, data) => {
        ev.preventDefault();
        const savePromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
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
            <UserForm onSave={handleProfileInfoUpdate} data={userInfo} />
        </section>
     );
}
 
export default ProfilePage;