'use client';

import { ChevronDown, ChevronUp, X } from "lucide-react"
import { useState } from "react"


export const MenuItemPriceProps = ({ props, setProps, nameProps, labelProps}) => {
    const [expanded, setExpanded] = useState(false);
    const addSizes = () => {
        setProps((oldSizes) => {
            return [...oldSizes, {name: '', price: 0}]
        })
    }

    const editSizes = (e, index, prop) => { 
        const newValue = e.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    const removeSize = (index) => {
        setProps(previous => previous.filter((v,i) => i !== index))
    }

    return (
        <diV className='bg-gray-200 p-2 rounded-md mb-2 '>
            <div className="flex gap-2">
                <button
                    onClick={() => setExpanded(state => !state )}
                    type="button"
                    className=" justify-start inline-flex mb-2">
                    {expanded ? <ChevronUp /> : <ChevronDown /> }
                    <span className="text-gray-700">{nameProps}</span>
                    <span>({props.length})</span>
                </button>
            </div>
            <div className={expanded ? 'block' : 'hidden'}>
              {props?.length > 0 && props.map((prop, index) => (
                <div className="flex gap-2">
                    <div>
                        <label>Size name</label>
                        <input
                            type="text" value={prop.name} placeholder="Size name"
                            onChange={e => editSizes(e , index, 'name')}
                        />
                    </div>
                    <div>
                        <label>Extra pice</label>
                        <input
                            type="number" value={prop.price} placeholder="Extra "
                            onChange={e => editSizes(e , index, 'price')}
                        />
                    </div>
                    <div
                        onClick={() => removeSize( index)}
                        className="mt-10 cursor-pointer bg-red-600 rounded-full p-[2px] w-6 h-6 text-white">
                        <X className="w-5 h-5"/>
                    </div>
                </div>
              ))}
                <button
                    type="button"
                    onClick={addSizes}
                    className="bg-white mt-1"
                    >
                    {labelProps}
                </button>
            </div>
        </diV>
    )
}