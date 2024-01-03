import { UploadButton } from "@uploadthing/react";
import { File, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export const EditableImage = ({ link, setLink }) => {
    return (
        <>
            {link && (
                <div className="relative">
                    <diV className="absolute right-2 top-2 rounded-full p-1 bg-rose-500">
                        <button
                            onClick={() => setLink('')}
                            type="button" className="p-[3px] text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </diV>
                    <Image alt="profileImage" className='rounded-lg w-full h-[200px] mb-1' src={link} width={250} height={250} />

                </div>
            )}
            {!link && (
                <div className="bg-gray-200 p-3 mb-2 rounded-lg text-gray-500 items-center text-center flex">
                    <div>
                        <File className="w-10 h-10" />
                    </div>
                    No Image.
                </div>
            )}
            <UploadButton
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