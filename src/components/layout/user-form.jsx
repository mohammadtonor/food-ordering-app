'use client';

import { useState } from 'react';
import { EditableImage } from './../EditableImage';
import { useProfile } from '../UseProfile';
import { AddressInput } from './AddressInput';

export const UserForm = ({ onSave, data }) => {
    console.log('dfdskfsdlk',data);
    const [userName, setUserName] = useState(data?.name);
    const [imageUrl, setImageUrl] = useState(data?.image ||'');
    const [phone, setPhone] = useState( data?.phone || '');
    const [streetAddress, setStreetAddress] = useState(data?.streetAddress || '');
    const [city, setCity] = useState(data?.city || '');
    const [country, setCountry] = useState(data?.country ||'');
    const [postalCode, setPostalCode] = useState(data?.postalCode || '');
    const [admin, setAdmin] = useState(data?.admin || '');
    const { data: loggedInUser } = useProfile();

    const handleSetProps = (propName, propsValue) => {
        if (propName === 'phone') setPhone(propsValue);
        if (propName === 'streetAddress') setStreetAddress(propsValue);
        if (propName === 'postalCode') setPostalCode(propsValue);
        if (propName === 'city') setCity(propsValue);
        if (propName === 'country') setCountry(propsValue);
     }
    
    return (
        <div className="max-w-2xl mx-auto">
            <div className='flex gap-4 items-center'>
                <div className="h-full w-[180px] mb-auto">
                    <div className='bg-gray-100 p-2 rounded-lg mt-1'>
                        <EditableImage link={imageUrl} setLink={setImageUrl} />
                    </div>
                </div>
                <form
                    className='grow '
                    onSubmit={(e) => {
                        onSave(e, {
                            name: userName,
                            image: imageUrl,
                            phone, streetAddress, postalCode,
                            city, country , admin
                        })
                    }}
                >
                    <label>FirstName and LastName</label>
                    <input
                        onChange={(ev => setUserName(ev.target.value))}
                        type='text'
                        value={userName}
                        placeholder='First and last name'
                    />
                    <label>Email</label>
                    <input type='email' disabled={true} value={data?.email} />
                    <AddressInput
                        addressProps={{ phone, streetAddress, postalCode, city, country }}
                        setAddressProps={handleSetProps}
                    />
                    {loggedInUser.admin && (
                        <div>
                            <label htmlFor='adminCb' className='p-2 inline-flex items-center borde gap-2 mb-2 '>
                                <input
                                    id="adminCb" type='checkbox' value={'1'}
                                    checked={admin}
                                    onChange={(e) => setAdmin(e.target.checked)}
                                    
                                    />
                                <span>Admin</span>
                            </label>
                        </div>
                    )}
                    <button type='submit'>Save</button>
                </form>
            </div>
        </div>
    )
}