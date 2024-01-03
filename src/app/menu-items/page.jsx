'use client';

import Link from 'next/link';
import { UserTabs } from './../../components/layout/tabs';
import { useProfile } from './../../hooks/UseProfile';
import { ArrowRightCircle } from 'lucide-react';

const MenuItemsPage = () => {
    
    const { loading, data } = useProfile();

    

    if (loading) {
        return 'Loading user data...';
    }

    if (!data.admin) {
        return 'No an admin'
    }

    return ( 
        <section className="mt-8 max-w-md mx-auto">
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
        </section>
     );
}
 
export default MenuItemsPage;