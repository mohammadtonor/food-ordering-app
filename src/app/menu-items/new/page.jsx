'use client';

import { useState } from 'react';
import { EditableImage } from '../../../components/EditableImage';
import { UserTabs } from './../../../components/layout/tabs';
import { useProfile } from './../../../hooks/UseProfile';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeftCircleIcon } from 'lucide-react';

const NewMenuItemsPage = () => {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState(0);
    const { loading, data } = useProfile();

    const handleFormSubmit = async (ev) => {
        ev.preventDefault();
        const data = { name, image, description, basePrice };
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
            
            setName('');
            setDescription('');
            setImage('');
            setBasePrice(0);
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
            <form onSubmit={handleFormSubmit} className='mx-auto  max-w-md mt-8'>
                <div className='flex gap-2 my-5 justify-center rounded-full p-2 py-3 items-center bg-gray-100'>
                    <ArrowLeftCircleIcon />
                    <Link
                        href={'/menu-items'}>
                        Show all menu-items
                    </Link>
                </div>
                <div className='flex gap-8'>
                    <div>
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className='grow'>
                        <label>Item name</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Description</label>
                        <input
                            type='text'
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                        />
                        <label>Base price</label>
                        <input
                            value={basePrice}
                            onChange={ev => setBasePrice(ev.target.value)}
                            type='text'
                        />
                        <button type='submit'>Save</button>
                    </div>
                </div>
            </form>
        </section>
     );
}
 
export default NewMenuItemsPage;