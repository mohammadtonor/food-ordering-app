'use client';

import { useEffect, useState } from "react";
import SectionHeader from "../../components/layout/section-header";
import { MenuItem } from "../../components/menu/MenuItem";



const MenuPage = () => {
    const [categories, setCtegories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => setCtegories(categories))
        });
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItem => setMenuItems(menuItem))
        })
    }, [])
    
    return ( 
        <section className="mt-8">
            {categories.length > 0 && categories.map(cat => (
                <div key={cat._id}>
                    <div className="text-center mt-8">
                        <SectionHeader mainHeader={cat.name}/>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 mt-6 mb-12">
                        {menuItems.length > 0 && menuItems.filter(menuItem => cat._id === menuItem.category).map(menuItem => (
                            <MenuItem key={menuItem._id} {...menuItem} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
     );
}
 
export default MenuPage;