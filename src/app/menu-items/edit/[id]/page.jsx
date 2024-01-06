'use client';

import { useEffect, useState } from "react";
import { useProfile } from './../../../../hooks/UseProfile';
import toast from "react-hot-toast";
import Link from "next/link";
import { UserTabs } from './../../../../components/layout/tabs'
import { ArrowLeftCircleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { MenuItemForm } from './../../../../components/layout/MenuItemForm';
import { DeleteItemButton } from './../../../../components/layout/DeleteItemButton';


const EditMenuItemPage = () => {

    const { id } = useParams();
    const [menuItem, setMenuItem] = useState(null);
    const { loading, data } = useProfile();
    const router = useRouter();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(item => item._id === id);
                setMenuItem(item);
            })
        })
    }, [])

    const handleFormSubmit = async (ev, data) => {
        ev.preventDefault();
        data = {...data, _id: id}
        const savePromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'Put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok)
                resolve();
            else
                reject();
          
        });

        toast.promise(savePromise, {
            loading: 'Upadting menu-item...',
            success: 'menu-item Updated successfully!',
            error: 'Failed Updating menu-item.'
        })
    }

    async function handleDeleteItem() {
        const deletePromise = new Promise( async (resolve, reject) => {
          const response = await fetch('/api/menu-items?_id=' + id, {
                method: 'DELETE',
            })
            if (response.ok)
                resolve();
            else
                reject();
        })

        toast.promise(deletePromise, {
            loading: 'Deleting...',
            success: 'Menu Item deleted successfully!',
            error: 'Failed Deleteing Menu Item.'
        });

        router.push('/menu-items')
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
            <MenuItemForm
                onSubmit={handleFormSubmit}
                menuItem={menuItem}
            />  
            <div className="max-w-md mx-auto mt-2">
                <div className="ml-auto max-w-xs pl-4">
                    <DeleteItemButton
                        label={'Delete this item'}
                        onConfirm={handleDeleteItem}
                     />
                </div>
            </div> 
        </section>
     );
}
 
export default EditMenuItemPage;