'use client';

import Link from 'next/link';
import { UserTabs } from './../../components/layout/tabs';
import { useProfile } from './../../components/UseProfile';
import { ArrowRightCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const MenuItemsPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then((response) => {
            response.json().then(data => {
                setMenuItems(data);
            })
        })
    }, [])

    if (loading) {
        return 'Loading user data...';
    }

    if (!data.admin) {
        return 'No an admin'
    }

    return ( 
        <section className="mt-8 max-w-xl mx-auto">
            <UserTabs isAdmin={data.admin} />
            <div className='mt-8'>
                <Link
                    className='button'
                    href={'/menu-items/new'}
                >
                    Create new
                    <ArrowRightCircle className=''/>
                </Link>
            </div>
            <div>
                <h2 className='text-gray-500 text-sm mt-8 mb-2'>Edit Menu item</h2>
                <div className='grid grid-cols-3 gap-2'>
                {menuItems?.length > 0 && menuItems.map(item => (
                    <Link href={'/menu-items/edit/' + item._id} className='button flex flex-col'>
                        <div className='relative'>
                            <Image src={item.image} alt='menu-item' width={200} height={200}/>
                        </div>
                        <div className='text-center'>
                          {item.name}
                        </div>
                    </Link>
                ))}
            </div>
                </div>
        </section>
     );
}
 
export default MenuItemsPage;