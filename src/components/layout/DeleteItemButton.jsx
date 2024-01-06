'use Client';

import { useState } from "react"

export const DeleteItemButton = ({label, onConfirm }) => {
    const [showConfirm, setShowConfirm] = useState(false); 

    if (showConfirm) {
        return (
            <div className="fixed inset-0 h-full flex items-center bg-black/50 justify-center">
                <div className= "fixed bg-white p-4 rounded-lg">
                    <div>Are you sure to delete?</div>
                    <div className="flex gap-2 mt-2">
                        <button type="button" onClick={() => setShowConfirm(false)}>
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                            }}
                            type="button" className="primary">
                            yes,delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <button type="button" onClick={() => setShowConfirm(true)}>
            {label}
        </button>
    )
}