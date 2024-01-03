'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export const UserTabs = ({ isAdmin }) => {
    const pathName = usePathname();

    return (
        <div className="flex gap-2 mx-auto justify-center tabs mb-2">
          <Link
                className={pathName === '/profile' ? 'active' : ''}
                href={'/profile'}
            >
                Profile
            </Link>
          {isAdmin && (
            <>
                <Link
                    href={'/categories'}
                    className={pathName === '/categories' ? 'active' : ''}
                    >
                        Categories
                </Link>
                <Link
                    href={'/menu-items'}
                    className={pathName.includes('/menu-items') ? 'active' : ''}
                    >
                       Menu Items
                </Link>
                <Link
                    href={'/users'}
                    className={pathName === '/users' ? 'active' : ''}
                    >
                        Users
                </Link>        
            </>
         )}
       </div>
    );
}