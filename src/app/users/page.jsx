'use client'

import { useEffect, useState } from 'react';
import { UserTabs } from './../../components/layout/tabs';
import { useProfile } from './../../components/UseProfile';
import Link from 'next/link';
const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/users').then(res => {
            res.json().then(users => setUsers(users))
        })
    }, [])

    if (loading) { 
        return 'Loading user Info';
    }

    if (!data.admin) {
        return 'Not an admin'    
    }

    return ( 
        <section className="max-w-xl mx-auto mt-8">
            <UserTabs isAdmin={data.admin} />
            <div>
                {users.length > 0 && users.map(user => (
                    <div key={user._id} className='bg-gray-100 rounded-lg justify-between mb-2 p-2 flex'>
                        <div className='flex gap-4'>
                            {!!user.name && (<span className='span'>{user.name}</span>)}
                            {!user.name && (<span className='span'>No name</span>)}
                            <span className='span'>{user.email}</span>
                        </div>
                        <div>
                            <Link href={'/users/' + user._id} className='button'>Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
     );
}
 
export default UsersPage;