'use client';

import { UserTabs } from './../../../components/layout/tabs';
import { useProfile } from './../../../components/UseProfile';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeftCircleIcon } from 'lucide-react';
import { MenuItemForm } from '../../../components/layout/MenuItemForm';

const NewMenuItemsPage = () => {
    const { loading, data } = useProfile();

    const handleFormSubmit = async (ev, data) => {
        ev.preventDefault();
        const savePromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok)
                resolve();
            else
                reject();
            
        });

        toast.promise(savePromise, {
            loading: 'Saving menu-item...',
            success: 'menu-item saved successfully!',
            error: 'Failed saving menu-item.'
        })
    }

    if (loading) {
        return 'Loading user data...';
    }

    if (!data.admin) {
        return 'No an admin'
    }
    
    return ( 
        <section className="mt-8">
            <UserTabs isAdmin={data.admin} />
            <div className='mx-auto max-w-md mt-4'>
                <Link
                className="text-gray-500 button "
                    href={'/menu-items'}>
                    <ArrowLeftCircleIcon />
                    Show all menu-items
                </Link>
            </div>
            <MenuItemForm onSubmit={handleFormSubmit} />
        </section>
     );
}
 
export default NewMenuItemsPage;