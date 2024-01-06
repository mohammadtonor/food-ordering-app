import { UploadButton } from "@uploadthing/react";
import { File, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export const EditableImage = ({ link, setLink }) => {
    return (
        <>
            {link && (
             <div className="  bg-gray-300">
                <div className="relative">
                    <diV className="absolute right-1 top-1 rounded-full p-1 bg-rose-500">
                        <button
                            onClick={() => setLink('')}
                            type="button" className="p-[3px] text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </diV>
                    <Image alt="profileImage" className='rounded-lg mb-1' src={link} width={250} height={250} />
                </div>
             </div>
            )}
            {!link && (
                <div className="bg-gray-200 p-2 w-full mb-2 rounded-lg text-gray-500 items-center text-center flex">
                    <div>
                        <File className="w-10 h-10" />
                    </div>
                    No Image.
                </div>
            )}
            <UploadButton
                className="mt-2"
                endpoint="imageUploader"
                onUploadProgress={() => toast('File is Uploading...')}
                onClientUploadComplete={(res) => {
                // Do something with the response
                    console.log("Files: ", res[0]?.url);
                    setLink(res[0]?.url);
                    toast.success('File uploaded successfully')
                }}
                onUploadError={(error) => {
                // Do something with the error.
                    toast.error(`ERROR! ${error.message}`);
                }}
            />
        </>
    )
}