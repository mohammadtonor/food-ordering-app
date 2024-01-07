import { useEffect, useState } from "react";
import { EditableImage } from "../EditableImage";
import { MenuItemPriceProps } from './MenuItemPriceProps';
import { set } from "mongoose";

export const MenuItemForm = ({ onSubmit, menuItem }) => {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || 0);
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);
    const [
        extraIngredientPrices,
        setExtraIngredientPrices]
        = useState(menuItem?.extraIngredientPrices || []);
    
    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            })
        })
    },[])
    
    return (
        <form onSubmit={ev => onSubmit(ev, {
            image, name, description, basePrice, sizes,
            category, extraIngredientPrices
           })
        }
            className='mx-auto  max-w-2xl mt-8'>
            <div
                style={{gridAutoColumns: '.1fr .7fr'}}
                className='flex gap-2 items-start' >
                <div className="w-[190px] h-full">
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className='grow'>
                    <label>Item name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Description</label>
                    <input
                        type='text'
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                    />
                    <label>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.length > 0 && categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    <label>Base price</label>
                    <input
                        value={basePrice}
                        onChange={ev => setBasePrice(ev.target.value)}
                        type='text'
                    />
                    <MenuItemPriceProps
                        nameProps="Sizes"
                        labelProps="Add item sizes"
                        props={sizes} setProps={setSizes}
                    />
                    <MenuItemPriceProps
                        nameProps="Extra Ingredient"
                        labelProps="Add extra Ingredient"
                        props={extraIngredientPrices}
                        setProps={setExtraIngredientPrices}
                    />
                    <button className="mt-5 hover:bg-primary/80" type='submit'>Save</button>
                   
                </div>
            </div>
            </form>
    )
}