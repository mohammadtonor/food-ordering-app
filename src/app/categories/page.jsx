'use client';

import { useEffect, useState } from 'react';
import { UserTabs } from './../../components/layout/tabs';
import {useProfile} from '../../hooks/UseProfile'
import toast from 'react-hot-toast';

const CategoriesPage = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategory] = useState([]);
    const [editedCategory, setEditedCategory] = useState(null);
    const {
        loading: profileFething,
        data: profileData
    } = useProfile();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategory(categories);
            })
        });
    }

    const handleCategorySubmit = async (ev) => {
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName }
            if (editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory? 'PUT' :'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            });
            fetchCategories();
            setCategoryName('');
            setEditedCategory(null);
            if (response.ok)
                resolve()
            else
                reject()
        });

        await toast.promise(creationPromise, {
            loading: editedCategory? 'Updateing Category' : 'Categgory Creating...',
            success: editedCategory ? 'Updated category succesfuly' :  'Categgory Creation Successful!',
            error: editedCategory ? 'Failed Updating Category.' : 'Failed to create category.'
        })
    }

    if (profileFething) {
        return 'loading User Info...'
     }

    if (!profileData.admin) {
        return (
            <div>Not an admin!</div>
        )
     }

    return ( 
        <section className='mt-8 max-w-lg mx-auto '>
            <UserTabs isAdmin={profileData.admin}/>
            <form className='mt-8' onSubmit={handleCategorySubmit}>
                <div className='flex gap-2 items-end'>
                    <div className='grow '>
                        <label>
                            {editedCategory ? 'Update category' : 'New Category name'} 
                            {editedCategory && (<>:  <b>{editedCategory.name}</b></>)}
                        </label>
                        <input
                            type='text'
                            value={categoryName}
                            onChange={ev => setCategoryName(ev.target.value)}
                        />
                    </div>
                    <div className='pb-1'>
                        <button type='submit' className=''>
                           {editedCategory ? 'Update' : 'Create'} 
                        </button>
                    </div>
                </div>

            </form>
            <div>
                <h2 className='mt-8 text-sm text-gray-500'>Edit category</h2>
                {categories.length > 0 && categories.map((category) => (
                    <div
                        key={category._id}
                        className='flex gap-1 bg-gray-200 rounded-xl p-2 px-4 mb-2'
                    >
                        <button
                            type='button'
                            onClick={() => {
                                setEditedCategory(category)
                                setCategoryName(category.name)
                            }}
                            className=''>
                            <span>{category.name}</span>
                        </button>
                   </div>
                ))}
            </div>
        </section>
     );
}
 
export default CategoriesPage;