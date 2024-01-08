'use client';

import { useEffect, useState } from 'react';
import { UserTabs } from './../../components/layout/tabs';
import {useProfile} from '../../components/UseProfile'
import toast from 'react-hot-toast';
import { Edit, Edit2, Trash, Trash2 } from 'lucide-react';

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

        fetchCategories();
    }

    const handleDeleteCategory = async (_id) => {
        const deleteProomis = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories?_id=' + _id, {
                method: 'DELETE',
            })

            if (response.ok)
                resolve();
            else
                reject();
        });

        
        toast.promise(deleteProomis, {
            loading: 'Deleting...',
            success: "Categories deleted succes!",
            error: 'Failed to delete categories'
        })
        
        fetchCategories();
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
                    <div className='pb-1 flex gap-1'>
                        <button type='submit'>
                            {editedCategory ? 'Update' : 'Create'} 
                        </button>
                        {editedCategory && (
                            <button
                            type='button'
                                onClick={() => {
                                    setEditedCategory(null);
                                    setCategoryName('')
                                }}
                        >
                            Cancel
                        </button>
                        )}
                    </div>
                </div>

            </form>
            <div>
                <h2 className='mt-8 mb-2 text-sm text-gray-500'>Edit category</h2>
                {categories.length > 0 && categories.map((category) => (
                    <div
                        key={category._id}
                        className='bg-gray-200  px-4 justify-end rounded-xl items-center p-2 flex gap-2 mb-1'
                    >
                        <div className='grow'>
                            {category.name}
                        </div>
                        <div className='flex gap-1 items-center'>
                            <button
                                onClick={() => {
                                    setEditedCategory(category)
                                    setCategoryName(category.name)
                                }}
                                type='button' className='p-1'>
                                <Edit className='w-5 h-5'/>
                            </button>
                            <button
                                type='button'
                                className='p-[6px]'
                                onClick={() => handleDeleteCategory(category._id)}
                            >
                                <Trash2 className='w-5 h-5' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
     );
}
 
export default CategoriesPage;