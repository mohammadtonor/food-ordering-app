'use client';

import { useState } from 'react';
import { EditableImage } from './../EditableImage';

export const UserForm = ({ onSave, data }) => {
    const [userName, setUserName] = useState(data?.name);
    const [imageUrl, setImageUrl] = useState(data?.image ||'');
    const [phone, setPhone] = useState( data?.phone || '');
    const [streetAddress, setStreetAddress] = useState(data?.streetAddress || '');
    const [city, setCity] = useState(data?.city || '');
    const [country, setCountry] = useState(data?.country ||'');
    const [postalCode, setPostalCode] = useState(data?.postalCode || '');
    
    return (
        <div className="max-w-xl mx-auto">
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
                            city, country
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
                    <div className="flex gap-2 ">
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
                    <button type='submit'>Save</button>
                </form>
            </div>
        </div>
    )
}