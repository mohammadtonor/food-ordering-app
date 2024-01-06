'use client';

import {useProfile} from './../../../hooks/UseProfile'
import { UserTabs } from './../../../components/layout/tabs';
import { UserForm } from './../../../components/layout/user-form';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronLeftCircle } from 'lucide-react';
import Link from 'next/link';

const EditUserPage = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const [fetchedUser, setFetchedUser] = useState(false);
    const { loading, data } = useProfile();

    useEffect(() => { 
        fetch('/api/profile?_id=' + id).then(res => {
            res.json().then(user => {
                setUser(user);
           })
           setFetchedUser(true);
        })
    }, []);

    const handleSaveButtonClick = async (ev, data) => {
        ev.preventDefault();
        const savePromise = new Promise( async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({...data, _id: id}),
            })
            if (response.ok)
                resolve();
            else
                reject();
        })

        await toast.promise(savePromise, {
            loading: 'Saving...',
            success: 'Saved successfully',
            error: 'Failed to save'
        })
    }

    if (loading || !fetchedUser) { 
        return 'Loading user profile...'
    }

    if (!data.admin) {
        return 'Not as admin';
    }

    return ( 
        <section className='mt-8 max-w-2xl mx-auto'>
            <UserTabs isAdmin={data.admin} />
            <div className='max-w-md mx-auto my-4'>
                <Link href={'/users'} className='button'>
                    <ChevronLeftCircle />
                    Back to user lists
                </Link>
            </div>
            <UserForm data={user} onSave={handleSaveButtonClick}/>
        </section>
     );
}
 
export default EditUserPage;