'use client';

import { UploadButton } from "./../../libs/uploadthing";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
    const session = useSession();
    const [userName, setUserName] = useState(session.data?.user?.name || '');
    const [imageUrl, setImageUrl] = useState(session.data?.user?.image || '');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data?.user?.name || '')
        }
    },[session,status])

    const handleProfileInfoUpdate = async (ev) => {
        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);
        await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({name: userName, image: imageUrl})
        })
        .then((res) => {
            if (res.ok) {
                setSaved(true);
            }    
        })
        setIsSaving(false);
    }

    const handleFileChange = async () => {
        if (!!imageUrl) {
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({imageUrl}),
                headers: {'content-type': 'application/json'}
            })
        }
     }
    
    if (status === 'loading') {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    const userImage = session.data?.user?.image;

    return ( 
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Profile
            </h1>
            {saved && (
                <div className='mx-auto max-w-md'>
                    <h2 className='bg-green-100 p-4 text-center rounded-lg border border-green-300'>
                        Profile Saved!
                    </h2>
                </div>
            )}
            {isSaving && (
                <div className='mx-auto max-w-md'>
                    <h2 className='bg-orange-200 p-4 text-center rounded-lg border border-orange-300'>
                        Saving...
                    </h2>
                </div>
             )}
            <div className="max-w-md mx-auto">
                <div className='flex gap-4 items-center'>
                    <div>
                        <div className='bg-gray-100 p-2 rounded-lg'>
                            <Image className='rounded-lg w-full h-full mb-1' src={userImage} width={250} height={250} />
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                // Do something with the response
                                    console.log("Files: ", res[0]?.url);
                                    setImageUrl(res[0]?.url);
                                alert("Upload Completed");
                                }}
                                onUploadError={(error) => {
                                // Do something with the error.
                                alert(`ERROR! ${error.message}`);
                                }}
                            />
                        </div>
                    </div>
                    <form className='grow' onSubmit={handleProfileInfoUpdate}>
                        <input
                            onChange={(ev => setUserName(ev.target.value))}
                            type='text'
                            value={userName}
                            placeholder='First and last name'
                        />
                        <input type='email' disabled={true} value={session.data?.user.email} />
                        <button type='submit'>Save</button>
                    </form>
                </div>
            </div>
        </section>
     );
}
 
export default ProfilePage;