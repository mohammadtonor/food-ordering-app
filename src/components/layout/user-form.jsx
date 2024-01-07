'use client';

import { useState } from 'react';
import { EditableImage } from './../EditableImage';
import { useProfile } from '../UseProfile';

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
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        placeholder="Phone number"
                        onChange={ev => setPhone(ev.target.value)}
                        value={phone}
                    />
                    <label>Address</label>
                    <input
                        type="text" placeholder="Street address"
                        value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                    <div className="grid grid-cols-2 gap-2 ">
                        <div>
                            <label>postal Code</label>
                            <input
                                type="text" placeholder="Postal code"
                                value={postalCode} onChange={ev => setPostalCode(ev.target.value)}
                                />
                        </div>
                        <div>
                            <label>city</label>
                            <input
                                type="text" placeholder="city"
                                value={city} onChange={ev => setCity(ev.target.value)}
                            />
                        </div>
                    </div>
                    <label>Country</label>
                    <input
                        type="text" placeholder="Country"
                        className="m-0"
                        value={country} onChange={ev => setCountry(ev.target.value)}
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