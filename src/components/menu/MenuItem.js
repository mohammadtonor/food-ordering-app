'use client';

import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import { MenuItemTiles } from './../menu/MenuItemTile';
import toast from "react-hot-toast";
import Image from "next/image";

export const MenuItem = (menuItem) => {
    const {
        name, description, basePrice, image,
        sizes, extraIngredientPrices
    } = menuItem;
    const [showPopup, setShowPopup] = useState(false);
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);


    const handleExtrasThingClick = (ev, extraThing) => {
        const checked = ev.target.checked;
        if (checked) { 
            setSelectedExtras(prev => [...prev, extraThing]);
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name !== extraThing.name);
            })
        }
        console.log(selectedExtras);
    } 

    const {addToCart} = useContext(CartContext);


    const handleAddToCartOnClick = () => {
        const hasoptions = sizes?.length > 0 && extraIngredientPrices?.length > 0
        if (hasoptions && !showPopup) {
            setShowPopup(true);
            return;
        }
        addToCart(menuItem, selectedSize, selectedExtras);
        setShowPopup(false);
        toast.success('Added to cart');
    }

    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }

    return (
        <>
        {showPopup && (
            <div onClick={() => setShowPopup(false)}
                className="fixed inset-0 items-center justify-center flex bg-black/80 ">
                <div className="bg-white p-2 my-8 rounded-lg max-w-md">
                    <div
                        onClick={(ev) => ev.stopPropagation()}        
                        className="overflow-y-scroll p-2"
                         style={{maxHeight:'calc(100vh - 20px)'}}>   
                            <Image src={image} alt={name} width={300} height={200} className="mx-auto" />        
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-gray-500 text-sm text-center mb-2">{description}</p>
                            {sizes.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Pich your sizes</h3>
                                    {sizes.map(size => (
                                        <label key={size.name} className="flex items-center gap-2 p-4 rounded-md mb-1">
                                            <input
                                                onClick={() => setSelectedSize(size)}
                                                checked={selectedSize?.name === size.name}
                                                type="radio" name="size"
                                            />
                                            {size.name} ${basePrice + size.price}
                                        </label>
                                    ))}
                                </div>
                        )}
                        {extraIngredientPrices.length > 0 && (
                            <div className="py-2">
                                <h3 className="text-center text-gray-700">Pich your extra Ingredient</h3>
                                {extraIngredientPrices.map(extra => (
                                    <label key={extra.name} className="flex items-center gap-2 p-4 rounded-md mb-1">
                                        <input
                                            type="checkbox"
                                            name={extra.name}
                                            onClick={e => handleExtrasThingClick(e, extra)}
                                            
                                        />
                                        {extra.name} +${extra.price}
                                    </label>
                                ))}
                            </div>
                        )}
                         <button
                            onClick={handleAddToCartOnClick}
                            className="primary"
                            type="submit">
                                 Add To Cart ${selectedPrice}
                            </button>
                            <button
                                type="button"
                                className="mt-2 button"
                                onClick={() => setShowPopup(false)}
                            >
                                Cancel
                            </button>
                     </div> 
                </div>      
           </div>     
        )}
            <MenuItemTiles
                {...menuItem}
                onAddToCart={handleAddToCartOnClick}
            />
       </>
    );
}